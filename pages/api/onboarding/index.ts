import { NextApiResponse } from "next";
import { requestMethod } from "@/middlewares/requestMethod";
import { CustomRequest } from "@/interfaces";
import authenticateToken from "@/middlewares/auth";
import { prisma } from "@/prisma";

const handler = async (req: CustomRequest, res: NextApiResponse) => {
  try {
    const projects = await prisma.project.findFirst({
      where: {
        userId: req?.user?.id,
      },
      include: {
        _count: {
          select: {
            logs: true,
          },
        },
      },
    });

    res.status(200).json([
      { isDone: projects ? true : false },
      {
        isDone:
          projects?._count.logs && projects._count.logs > 0 ? true : false,
      },
      { isDone: projects && projects._count.logs > 0 ? true : false },
    ]);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default requestMethod(["GET"])((
  req: CustomRequest,
  res: NextApiResponse
) => {
  authenticateToken(req, res, () => handler(req, res));
});
