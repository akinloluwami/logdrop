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
      requestBody: string;
      requestTime: string;
      responseTime: string;
      elapsedDuration: number;
    };

    const parser = new UAParser(log.userAgent).getResult();

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
    res.status(201).json({ message: "Logged" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default requestMethod(["POST"])(handler);
