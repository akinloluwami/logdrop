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
      userAgent: string;
      method: string;
      statusCode: number;
      responseBody: string;
      requestHeaders: string;
      requestTime: string;
      responseTime: string;
      elapsedDuration: number;
    };

    const parser = new UAParser(log.userAgent).getResult();

    await prisma.log.create({
      data: {
        endpoint: log.endpoint,
        userAgent: log.userAgent,
        method: log.method,
        statusCode: log.statusCode,
        requestHeaders: log.requestHeaders,
        responseBody: log.responseBody,
        projectId: key.projectId,
        requestTime: dayjs(log.requestTime).toDate(),
        responseTime: dayjs(log.responseTime).toDate(),
        elapsedDuration: log.elapsedDuration,
      },
    });
    res.status(201).json({ message: "Logged" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
    return;
  }
};

export default requestMethod(["POST"])(handler);
