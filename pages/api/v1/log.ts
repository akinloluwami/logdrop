import { resend } from "@/configs/resend";
import { isProd } from "@/lib/isProd";
import { requestMethod } from "@/middlewares/requestMethod";
import { prisma } from "@/prisma";
import dayjs from "dayjs";
import { NextApiRequest, NextApiResponse } from "next";
import { UAParser } from "ua-parser-js";
import { faker } from "@faker-js/faker";
import axios from "axios";
import { IpInfo } from "@/interfaces";
import { sendEmail } from "@/utils/sendEmail";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const apiKey = req.headers.authorization?.split(" ")[1];

    if (!apiKey) {
      res.status(401).json({ message: "API Key is missing in request" });
      return;
    }

    const key = await prisma.aPiKey.findUnique({
      where: {
        key: apiKey,
      },
    });

    if (!key) {
      res.status(400).json({ message: "API key is invalid" });
      return;
    }

    const log = req.body as {
      endpoint: string;
      url: string;
      userAgent: string;
      method: string;
      ip: string;
      statusCode: number;
      responseBody: string;
      requestHeaders: string;
      responseHeaders: string;
      requestBody: string;
      requestTime: string;
      responseTime: string;
      elapsedDuration: number;
    };
    log.ip = isProd ? log.ip : faker.internet.ipv4();

    const parser = new UAParser(log.userAgent).getResult();

    const logs = await prisma.log.count({
      where: {
        projectId: key.projectId,
      },
    });

    const project = await prisma.project.findUnique({
      where: {
        id: key.projectId,
      },
      select: {
        name: true,
        slug: true,
        user: {
          select: {
            id: true,
            email: true,
            plan: true,
            logsQuota: true,
            lastSentEightyPercentOfQuotaUsedEmail: true,
            lastSentQuotaExceededEmail: true,
          },
        },
      },
    });

    if (logs === 0) {
      sendEmail.firstLog(project?.user.email!, {
        name: project?.name!,
        slug: project?.slug!,
      });
    }
    const currentMonth = new Date().getMonth();

    const currentMonthLogs = await prisma.log.count({
      where: {
        project: {
          userId: project?.user.id!,
        },
        createdAt: {
          gte: dayjs().month(currentMonth).startOf("month").toISOString(),
          lte: dayjs().month(currentMonth).endOf("month").toISOString(),
        },
      },
    });

    const quota = project?.user.logsQuota;

    const isEightyPercentOfQuotaUsed = currentMonthLogs >= quota! * 0.8;

    const lastSentEightyPercentOfQuotaUsedEmail =
      project?.user.lastSentEightyPercentOfQuotaUsedEmail?.getMonth();

    const hasEmailEightyPercentEmailBeenSentThisMonth =
      lastSentEightyPercentOfQuotaUsedEmail === currentMonth;

    if (
      isEightyPercentOfQuotaUsed &&
      !hasEmailEightyPercentEmailBeenSentThisMonth
    ) {
      sendEmail.eightyPercentUsed(project?.user.email!);
      await prisma.user.update({
        where: { id: project?.user.id! },
        data: {
          lastSentEightyPercentOfQuotaUsedEmail: dayjs().toISOString(),
        },
      });
    }

    const isQuotaExceeded = currentMonthLogs >= quota!;

    const hasEmailQuotaExceededEmailBeenSentThisMonth =
      project?.user.lastSentQuotaExceededEmail?.getMonth() === currentMonth;

    if (isQuotaExceeded && !hasEmailQuotaExceededEmailBeenSentThisMonth) {
      sendEmail.quotaExceeded(project?.user.email!);
      await prisma.user.update({
        where: { id: project?.user.id! },
        data: {
          lastSentQuotaExceededEmail: dayjs().toISOString(),
        },
      });
    }

    if (isQuotaExceeded) {
      res.status(403).json({
        message: `You have reached the limit of ${quota} logs on your plan. Please upgrade to a bigger plan.`,
      });
      return;
    }

    const { data }: { data: IpInfo } = await axios(
      `https://ipwho.is/${log?.ip}`
    );

    const ipInfo: IpInfo = data;

    await prisma.log.create({
      data: {
        endpoint: log.endpoint,
        url: log.url,
        ip: log.ip,
        userAgent: log.userAgent,
        method: log.method,
        statusCode: log.statusCode,
        requestHeaders: log.requestHeaders,
        responseHeaders: JSON.stringify(log.responseHeaders),
        responseBody: log.responseBody,
        requestBody: log.requestBody || "{}",
        projectId: key.projectId,
        requestTime: dayjs(log.requestTime).toISOString(),
        responseTime: dayjs(log.responseTime).toISOString(),
        elapsedDuration: log.elapsedDuration,
        os: parser?.os?.name,
        device: parser?.device?.model,
        deviceType: parser?.device?.type,
        browser: parser?.browser?.name,
        city: ipInfo?.city,
        country: ipInfo?.country,
        country_code: ipInfo?.country_code,
        region: ipInfo?.region,
        region_code: ipInfo?.region_code,
        continent: ipInfo?.continent,
        continent_code: ipInfo?.continent_code,
        flag_emoji: ipInfo?.flag?.emoji,
        flag_img: ipInfo?.flag?.img,
      },
    });

    const events = await prisma.event.findMany({
      where: {
        projectId: key.projectId,
      },
    });

    const conditionsMatch = (
      conditions: any[],
      endpoint: string,
      statusCode: number,
      method: string
    ) => {
      console.log(conditions);
      return conditions.every(
        (condition: {
          endpoint: undefined;
          statusCode: undefined;
          method: undefined;
        }) => {
          if (condition.endpoint !== undefined) {
            const conditionEndpoint = condition.endpoint;
            // console.log(
            //   `Comparing endpoint: ${endpoint} (Expected: ${conditionEndpoint})`
            // );
            return conditionEndpoint === endpoint;
          } else if (condition.statusCode !== undefined) {
            const conditionStatusCode = condition.statusCode;
            // console.log(
            //   `Comparing statusCode: ${statusCode} (Expected: ${conditionStatusCode})`
            // );
            return conditionStatusCode === statusCode;
          } else if (condition.method !== undefined) {
            const conditionMethod = condition.method;
            // console.log(
            //   `Comparing method: ${method} (Expected: ${conditionMethod})`
            // );
            return conditionMethod === method;
          }
        }
      );
    };

    for (const event of events) {
      if (
        conditionsMatch(
          event.conditions,
          log.endpoint,
          log.statusCode,
          log.method
        )
      ) {
        await prisma.event.update({
          where: { id: event.id },
          data: {
            timesTriggered: {
              increment: 1,
            },
            lastTriggered: dayjs().toISOString(),
          },
        });
        await prisma.eventTrigger.create({
          data: {
            eventId: event.id,
            date: dayjs().format("YYYY-MM-DD"),
          },
        });
        if (event.action === "email") {
          await resend.emails.send({
            from: "LogDrop Event<event@logdrop.co>",
            to: project?.user.email!,
            subject: event.name,
            text: `
            Request body: ${log.requestBody}
            Response body: ${log.responseBody}
            `,
          });
        }
      }
    }

    res.status(201).json({ message: "Logged" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default requestMethod(["POST"])(handler);
