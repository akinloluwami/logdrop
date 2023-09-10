import { NextApiResponse } from "next";
import { requestMethod } from "@/middlewares/requestMethod";
import { CustomRequest } from "@/interfaces";
import authenticateToken from "@/middlewares/auth";
import { prisma } from "@/prisma";

const handler = async (req: CustomRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      const projectId = Number(req.query.id);

      const {
        name,
        conditions,
        action,
      }: { name: string; conditions: {}[]; action: string } = req.body;

      const newEvent = await prisma.event.create({
        data: {
          name,
          conditions,
          action,
          projectId,
        },
      });

      res.status(201).json(newEvent);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default requestMethod(["POST"])((
  req: CustomRequest,
  res: NextApiResponse
) => {
  authenticateToken(req, res, () => handler(req, res));
});
