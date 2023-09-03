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

    const generateApiKey = () => {
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      const keyLength = 32;

      let apiKey = "";

      for (let i = 0; i < keyLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        apiKey += characters.charAt(randomIndex);
      }

      return apiKey;
    };

    const apiKey = await prisma.aPiKey.create({
      data: {
        projectId: project?.id!,
        key: generateApiKey(),
      },
    });
    res.json({ key: apiKey.key });
  } catch (error) {}
};

export default requestMethod(["POST"])((
  req: CustomRequest,
  res: NextApiResponse
) => {
  authenticateToken(req, res, () => handler(req, res));
});
