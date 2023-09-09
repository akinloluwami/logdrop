import { NextApiResponse } from "next";
import { requestMethod } from "@/middlewares/requestMethod";
import { CustomRequest } from "@/interfaces";
import authenticateToken from "@/middlewares/auth";
import { prisma } from "@/prisma";

const handler = async (req: CustomRequest, res: NextApiResponse) => {
  try {
    const { uuid } = req.query as { uuid: string };

    const log = await prisma.log.findUnique({
      where: {
        uuid,
      },
    });

    if (!log) {
      res.status(404).json({ message: "Log not found" });
      return;
    }

    res.status(200).json(log);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export default requestMethod(["GET"])((
  req: CustomRequest,
  res: NextApiResponse
) => {
  authenticateToken(req, res, () => handler(req, res));
});
