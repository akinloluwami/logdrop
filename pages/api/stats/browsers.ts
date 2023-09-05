import { NextApiResponse } from "next";
import { requestMethod } from "@/middlewares/requestMethod";
import { CustomRequest } from "@/interfaces";
import authenticateToken from "@/middlewares/auth";
import { prisma } from "@/prisma";
import dayjs from "dayjs";

const handler = async (req: CustomRequest, res: NextApiResponse) => {
  try {
    const { startDate, endDate, projectId, take } = req.query;

    const start = dayjs(startDate as string);
    const end = dayjs(endDate as string);

    if (projectId === "null") {
      res.status(400).json({ message: "Project ID is required" });
      return;
    }

    const browsers = await prisma.log.groupBy({
      by: ["browser"],
      where: {
        projectId: Number(projectId),
        createdAt: {
          gte: start.toISOString(),
          lte: end.toISOString(),
        },
      },
      _count: true,
      orderBy: {
        _count: {
          endpoint: "desc",
        },
      },
      take: Number(take),
    });

    const mod = (browsers as { browser: string; _count: number }[]).map(
      ({ browser: name, _count: value }) => ({
        name,
        value,
      })
    );

    res.status(200).json(mod);
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
