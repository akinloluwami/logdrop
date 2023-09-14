import { NextApiResponse } from "next";
import { requestMethod } from "@/middlewares/requestMethod";
import { CustomRequest } from "@/interfaces";
import authenticateToken from "@/middlewares/auth";
import { prisma } from "@/prisma";
import dayjs from "dayjs";

const handler = async (req: CustomRequest, res: NextApiResponse) => {
  try {
    const { startDate, endDate, take, group } = req.query;

    const start = dayjs(startDate as string);
    const end = dayjs(endDate as string);

    const data = await prisma.log.groupBy({
      //@ts-ignore
      by: [group],
      where: {
        projectId: Number(req.query.id),
        createdAt: startDate &&
          endDate && {
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
      take: Number(take) || 10,
    });

    const renamedData = data.map((item) => ({
      value: item._count,
      name: item[group as string],
    }));

    res.status(200).json(renamedData);
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
