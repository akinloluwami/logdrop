import { NextApiResponse } from "next";
import { requestMethod } from "@/middlewares/requestMethod";
import { CustomRequest } from "@/interfaces";
import authenticateToken from "@/middlewares/auth";
import { prisma } from "@/prisma";

const handler = async (req: CustomRequest, res: NextApiResponse) => {
  try {
    const { projectId, status_codes, methods, search, length } = req.query;

    if (!projectId) {
      res.status(400).json({ message: "Project ID is required" });
      return;
    }

    const decodedStatusCodes = status_codes
      ? decodeURIComponent(status_codes).split("_").map(Number)
      : [];

    const decodedMethods = methods
      ? decodeURIComponent(methods).split("_")
      : [];

    const filters = {
      projectId: Number(projectId),
    };

    if (decodedStatusCodes.length > 0) {
      filters.statusCode = { in: decodedStatusCodes };
    }

    if (decodedMethods.length > 0) {
      filters.method = { in: decodedMethods };
    }

    const logs = await prisma.log.findMany({
      where: filters,
      take: Number(length) || 20,
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json(logs);
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
