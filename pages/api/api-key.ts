import { NextApiResponse } from "next";
import { requestMethod } from "@/middlewares/requestMethod";
import { CustomRequest } from "@/interfaces";
import authenticateToken from "@/middlewares/auth";
import { prisma } from "@/prisma";
import { generateApiKey } from "@/utils/generateApiKey";

const handler = async (req: CustomRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      const projectId = Number(req.query.projectId);

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
          message: "Project not found",
        });
        return;
      }

      const apiKey = await prisma.aPiKey.create({
        data: {
          projectId: project?.id!,
          key: generateApiKey(),
        },
      });
      res.json({ key: apiKey.key });
      return;
    }
    if (req.method === "GET") {
      const projectId = Number(req.query.projectId);

      const apiKey = await prisma.aPiKey.findFirst({
        where: {
          projectId,
        },
        select: {
          key: true,
        },
      });
      res.status(200).json(apiKey?.key);
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default requestMethod(["GET", "POST"])((
  req: CustomRequest,
  res: NextApiResponse
) => {
  authenticateToken(req, res, () => handler(req, res));
});
