import { NextApiResponse } from "next";
import { requestMethod } from "@/middlewares/requestMethod";
import { CustomRequest } from "@/interfaces";
import authenticateToken from "@/middlewares/auth";
import { prisma } from "@/prisma";
import dayjs from "dayjs";

const handler = async (req: CustomRequest, res: NextApiResponse) => {
  try {
    if (req.query.id === "null") {
      res.status(400).json({
        message: "Project ID is required",
      });
      return;
    }

    const projectId = Number(req.query.id);

    const { status_codes, methods, endpoint, dateRange, page, pageSize }: any =
      req.query;

    const decodedStatusCodes = status_codes
      ? decodeURIComponent(status_codes).split("_").map(Number)
      : [];

    const decodedMethods = methods
      ? decodeURIComponent(methods).split("_")
      : [];

    const filters: any = {
      projectId: Number(projectId),
    };

    if (decodedStatusCodes.length > 0) {
      filters.statusCode = { in: decodedStatusCodes };
    }

    if (decodedMethods.length > 0) {
      filters.method = { in: decodedMethods };
    }

    if (endpoint) {
      filters.endpoint = { contains: decodeURIComponent(endpoint) };
    }

    if (dateRange && dateRange !== "all") {
      const currentDate = dayjs();
      let fromDate;

      switch (dateRange) {
        case "15m":
          fromDate = currentDate.subtract(15, "minutes");
          break;
        case "30m":
          fromDate = currentDate.subtract(30, "minutes");
          break;
        case "1h":
          fromDate = currentDate.subtract(1, "hour");
          break;
        case "10h":
          fromDate = currentDate.subtract(10, "hour");
          break;
        case "24h":
          fromDate = currentDate.subtract(24, "hour");
          break;
        case "3d":
          fromDate = currentDate.subtract(3, "days");
          break;
        case "7d":
          fromDate = currentDate.subtract(7, "days");
          break;
        case "14d":
          fromDate = currentDate.subtract(14, "days");
          break;
        case "30d":
          fromDate = currentDate.subtract(30, "days");
          break;
        default:
          break;
      }

      filters.createdAt = {
        gte: fromDate?.toISOString(),
        lte: currentDate.toISOString(),
      };
    }

    const logs = await prisma.log.findMany({
      where: filters,
      take: Number(pageSize) || 20,
      orderBy: { createdAt: "desc" },
      skip: Number(page) * Number(pageSize) || 0,
    });

    res.status(200).json(logs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default requestMethod(["GET"])((
  req: CustomRequest,
  res: NextApiResponse
) => {
  authenticateToken(req, res, () => handler(req, res));
});
