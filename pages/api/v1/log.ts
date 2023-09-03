import { requestMethod } from "@/middlewares/requestMethod";
import { prisma } from "@/prisma";
import dayjs from "dayjs";
import { NextApiRequest, NextApiResponse } from "next";
import { UAParser } from "ua-parser-js";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
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
    console.log(log.requestHeaders);

    const parser = new UAParser(log.userAgent).getResult();
    console.log(parser);

    await prisma.log.create({
      data: {
        endpoint: log.endpoint,
        userAgent: log.userAgent,
        method: log.method,
        statusCode: log.statusCode,
        requestHeaders: log.requestHeaders,
        responseBody: log.responseBody,
        projectId: 1,
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
