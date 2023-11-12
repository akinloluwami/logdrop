import { CustomRequest } from "@/interfaces";
import authenticateToken from "@/middlewares/auth";
import { requestMethod } from "@/middlewares/requestMethod";
import { prisma } from "@/prisma";
import dayjs from "dayjs";
import { NextApiResponse } from "next";

const handler = async (req: CustomRequest, res: NextApiResponse) => {
  try {
    if (req.method === "GET") {
      const { from, to } = req.query as { from: string; to: string };

      const start = (from && dayjs(from)) || dayjs().startOf("month");
      const end = (to && dayjs(to)) || dayjs();

      const usage = await prisma.log.count({
        where: {
          project: {
            userId: req.user?.id,
          },
          createdAt: {
            gte: start.toDate(),
            lte: end.toDate(),
          },
        },
      });

      const usageByProject = await prisma.project.findMany({
        where: {
          userId: req.user?.id,
        },
        select: {
          name: true,
          _count: {
            select: {
              logs: {
                where: {
                  createdAt: {
                    gte: start.toDate(),
                    lte: end.toDate(),
                  },
                },
              },
            },
          },
        },
      });

      res.status(200).json({ usage, usageByProject });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};
export default requestMethod(["GET", "POST"])((
  req: CustomRequest,
  res: NextApiResponse
) => {
  authenticateToken(req, res, () => handler(req, res));
});
