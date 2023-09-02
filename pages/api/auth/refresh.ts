import { isProd } from "@/lib/isProd";
import { JWT_SECRET_KEY } from "@/lib/secrets";
import { requestMethod } from "@/middlewares/requestMethod";
import { prisma } from "@/prisma";
import { setCookie } from "cookies-next";
import dayjs from "dayjs";
import { sign, verify } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("Test");

  try {
    const refreshToken = req.cookies.refresh_token;

    if (!refreshToken) return res.status(401).json({ error: "Unauthorized" });

    const decoded = verify(refreshToken, JWT_SECRET_KEY!) as { id: number };

    const refresh_token = await prisma.refreshToken.findUnique({
      where: {
        userId: decoded.id,
      },
    });

    const hasExpired = dayjs().isAfter(dayjs(refresh_token?.expires_in));

    if (hasExpired) {
      await prisma.refreshToken.delete({
        where: {
          id: refresh_token?.id,
        },
      });
      return res.status(401).json({ error: "Unauthorized" });
    }

    const access_token = sign({ id: decoded.id }, JWT_SECRET_KEY as string, {
      expiresIn: "15m",
    });

    setCookie("access_token", access_token, {
      req,
      res,
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "strict",
      expires: dayjs().add(15, "m").toDate(),
    });
    res.send("ok");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default requestMethod(["POST"])(handler);
