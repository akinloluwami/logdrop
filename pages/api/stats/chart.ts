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

    const datesInRange: string[] = [];
    let currentDate = start;

    while (currentDate <= end) {
      datesInRange.push(currentDate.format("YYYY-MM-DD"));
      currentDate = currentDate.add(1, "day");
    }

    const chartData: { day: Date; count: number }[] = await prisma.$queryRaw`
      SELECT DATE_TRUNC('day', "createdAt"::timestamp) AS day, COUNT(*) AS count
      FROM "Log"
      WHERE "projectId" = ${Number(projectId)}
        AND "createdAt"::date >= ${start.toDate()}
        AND "createdAt"::date <= ${end.toDate()}
      GROUP BY day
    `;

    const chartDataMap = new Map();
    chartData.forEach((row) => {
      chartDataMap.set(
        row.day.toISOString().split("T")[0],
        Number(row.count.toString())
      );
    });

    const result = datesInRange.map((date) => ({
      "API Requests": chartDataMap.get(date) || 0,
      date,
    }));

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
