import { NextApiResponse } from "next";
import { requestMethod } from "@/middlewares/requestMethod";
import { CustomRequest } from "@/interfaces";
import authenticateToken from "@/middlewares/auth";
import { prisma } from "@/prisma";

const handler = async (req: CustomRequest, res: NextApiResponse) => {
  try {
    const project = await prisma.project.findFirst({
      where: {
        userId: req.user?.id,
      },
    });
    const apiKey = await prisma.aPiKey.findFirst({
      where: {
        projectId: project?.id,
      },
    });

    res.status(200).json({ key: apiKey?.key });
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
