import { resend } from "@/configs/resend";
import FirstRequest from "@/emails/first-request";
import { requestMethod } from "@/middlewares/requestMethod";
import { prisma } from "@/prisma";
import dayjs from "dayjs";
import { NextApiRequest, NextApiResponse } from "next";
import { UAParser } from "ua-parser-js";

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
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    if (logs === 0) {
      await resend.emails.send({
        from: "Akinkunmi at LogDrop<akin@logdrop.co>",
        to: project?.user.email!,
        subject: "LogDrop: Your First Request - You're Golden 🏆",
        react: FirstRequest(),
      });
    }

    await prisma.log.create({
      data: {
        date: dayjs().format("YYYY-MM-DD"),
        endpoint: log.endpoint,
        url: log.url,
        ip: log.ip,
        userAgent: log.userAgent,
        method: log.method,
        statusCode: log.statusCode,
        requestHeaders: log.requestHeaders,
        responseHeaders: JSON.stringify(log.responseHeaders),
        responseBody: log.responseBody,
        requestBody: log.requestBody,
        projectId: key.projectId,
        requestTime: dayjs(log.requestTime).toISOString(),
        responseTime: dayjs(log.responseTime).toISOString(),
        elapsedDuration: log.elapsedDuration,
        os: parser.os.name,
        device: parser.device.model,
        deviceType: parser.device.type,
        browser: parser.browser.name,
      },
    });

    const events = await prisma.event.findMany({
      where: {
        projectId: key.projectId,
      },
    });

    const conditionsMatch = (conditions, endpoint, statusCode) => {
      console.log(conditions);
      return conditions.every((condition) => {
        if (condition.endpoint !== undefined) {
          const conditionEndpoint = condition.endpoint;
          console.log(
            `Comparing endpoint: ${endpoint} (Expected: ${conditionEndpoint})`
          );
          return conditionEndpoint === endpoint;
        } else if (condition.statusCode !== undefined) {
          const conditionStatusCode = condition.statusCode;
          console.log(
            `Comparing statusCode: ${statusCode} (Expected: ${conditionStatusCode})`
          );
          return conditionStatusCode === statusCode;
        }
      });
    };

    for (const event of events) {
      if (conditionsMatch(event.conditions, log.endpoint, log.statusCode)) {
        await prisma.event.update({
          where: { id: event.id },
          data: {
            timesTriggered: {
              increment: 1,
            },
            lastTriggered: dayjs().toISOString(),
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
