import { CustomRequest } from "@/interfaces";
import { JWT_SECRET_KEY } from "@/lib/secrets";
import { prisma } from "@/prisma";
import { verify } from "jsonwebtoken";
import { NextApiResponse } from "next";

const authenticateToken = async (
  req: CustomRequest,
  res: NextApiResponse,
  next: () => void
) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(401).json({ message: "Token is missing in request" });
    }

    const decoded = verify(token, JWT_SECRET_KEY as string) as { id: number };

    const userId = decoded.id;

    if (!userId)
      return res.status(400).json({ message: "Missing user id in payload" });

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    req.user = user as { id: number };

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default authenticateToken;
