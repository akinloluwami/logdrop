import { NextApiResponse } from "next";
import { requestMethod } from "@/middlewares/requestMethod";
import { CustomRequest } from "@/interfaces";
import authenticateToken from "@/middlewares/auth";
import { prisma } from "@/prisma";

const handler = async (req: CustomRequest, res: NextApiResponse) => {
  try {
    const { projectId, length } = req.query;

    const logs = await prisma.log.findMany({
      where: {
        projectId: Number(projectId),
      },
      take: Number(length) || 20,
    });

    res.status(200).json(logs);
  } catch (error) {}
};

export default requestMethod(["GET"])((
  req: CustomRequest,
  res: NextApiResponse
) => {
  authenticateToken(req, res, () => handler(req, res));
});
