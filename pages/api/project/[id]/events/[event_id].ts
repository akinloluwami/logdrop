import { NextApiResponse } from "next";
import { requestMethod } from "@/middlewares/requestMethod";
import { CustomRequest } from "@/interfaces";
import authenticateToken from "@/middlewares/auth";
import { prisma } from "@/prisma";

const handler = async (req: CustomRequest, res: NextApiResponse) => {
  try {
    const eventId = req.query.event_id;
    if (req.method === "DELETE") {
      await prisma.event.delete({
        where: { id: Number(eventId) },
      });
      await prisma.eventTrigger.deleteMany({
        where: { eventId: Number(eventId) },
      });
      res.status(200).json({ message: "Event deleted" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default requestMethod(["DELETE"])((
  req: CustomRequest,
  res: NextApiResponse
) => {
  authenticateToken(req, res, () => handler(req, res));
});
