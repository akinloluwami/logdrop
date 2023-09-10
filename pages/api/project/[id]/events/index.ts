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

    if (req.method === "GET") {
      const events = await prisma.event.findMany({
        where: {
          projectId: Number(req.query.id),
        },
        orderBy: { createdAt: "desc" },
      });
      res.status(200).json(events);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default requestMethod(["POST", "GET"])((
  req: CustomRequest,
  res: NextApiResponse
) => {
  authenticateToken(req, res, () => handler(req, res));
});
