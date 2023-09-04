import { NextApiResponse } from "next";
import { requestMethod } from "@/middlewares/requestMethod";
import { CustomRequest } from "@/interfaces";
import authenticateToken from "@/middlewares/auth";
import { prisma } from "@/prisma";
import dayjs from "dayjs";

const handler = async (req: CustomRequest, res: NextApiResponse) => {
  try {
    const { startDate, endDate, projectId } = req.query;

    const start = dayjs(startDate as string);
    const end = dayjs(endDate as string);

    if (projectId === "null") {
      res.status(400).json({ message: "Project ID is required" });
      return;
    }

    const datesInRange = [];
    let currentDate = start;

    while (currentDate <= end) {
      datesInRange.push(currentDate.format("YYYY-MM-DD"));
      currentDate = currentDate.add(1, "day");
    }

    const logs = await prisma.log.groupBy({
      by: ["date"],
      where: {
        projectId: Number(projectId),
        createdAt: {
          gte: start.toISOString(),
          lte: end.toISOString(),
        },
      },
      _count: true,
    });

    const countMap = new Map();
    logs.forEach((log) => {
      countMap.set(log.date, log._count);
    });

    const result = datesInRange.map((date) => {
      const logEntry = logs.find((log) => log.date === date);

      if (logEntry) {
        return {
          "API Requests": logEntry._count,
          date,
        };
      } else {
        return {
          "API Requests": 0,
          date,
        };
      }
    });

    res.status(200).json(result);

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export default requestMethod(["GET"])((
  req: CustomRequest,
  res: NextApiResponse
) => {
  authenticateToken(req, res, () => handler(req, res));
});
