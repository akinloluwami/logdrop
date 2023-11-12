import { CustomRequest } from "@/interfaces";
import authenticateToken from "@/middlewares/auth";
import { requestMethod } from "@/middlewares/requestMethod";
import { prisma } from "@/prisma";
import { NextApiResponse } from "next";

const handler = async (req: CustomRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user?.id,
      },
    });

    return res.status(200).json(user);
  }
};

export default requestMethod(["GET", "POST"])((
  req: CustomRequest,
  res: NextApiResponse
) => {
  authenticateToken(req, res, () => handler(req, res));
});
