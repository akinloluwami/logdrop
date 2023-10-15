import { CustomRequest } from "@/interfaces";
import authenticateToken from "@/middlewares/auth";
import { requestMethod } from "@/middlewares/requestMethod";
import { prisma } from "@/prisma";
import { NextApiResponse } from "next";

const handler = async (req: CustomRequest, res: NextApiResponse) => {
  try {
    const projectId = Number(req.query.id);

    if (!projectId) {
      res.status(400).json({
        message: "Project ID is required",
      });
      return;
    }

    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
      },
    });

    if (!project) {
      res.status(404).json({
        message: "Invalid project id",
      });
      return;
    }

    res.status(200).json(project);
  } catch (error) {}
};

export default requestMethod(["GET"])(
  (req: CustomRequest, res: NextApiResponse) => {
    authenticateToken(req, res, () => handler(req, res));
  }
);
