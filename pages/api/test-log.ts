import { IpInfo } from "@/interfaces";
import { prisma } from "@/prisma";
import { generateRandomLog } from "@/utils/generateRandomLog";
import axios from "axios";
import dayjs from "dayjs";
import { NextApiRequest, NextApiResponse } from "next";
import { UAParser } from "ua-parser-js";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const apiKey = "ld_OctA4DoLo1F2TZ1BZnZM9FcF48OVtFLh";

    const key = await prisma.aPiKey.findUnique({
      where: {
        key: apiKey,
      },
    });

    if (!key) {
      return;
    }

    const log = generateRandomLog() as {
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

    res.status(200).json(log);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export default handler;
