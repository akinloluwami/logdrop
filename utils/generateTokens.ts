import { prisma } from "@/prisma";
import { sign } from "jsonwebtoken";
import { setCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";
import { isProd } from "@/lib/isProd";
import dayjs from "dayjs";
import { JWT_SECRET_KEY } from "@/lib/secrets";

const generateTokens = async (
  req: NextApiRequest,
  res: NextApiResponse,
  id: number
) => {
  try {
    const existingToken = await prisma.refreshToken.findFirst({
      where: {
        userId: id,
      },
    });

    const hasTokenExpired =
      existingToken && dayjs().isAfter(dayjs(existingToken?.expires_in));

    const access_token = sign({ id }, JWT_SECRET_KEY as string, {
      expiresIn: "15m",
    });

    const refresh_token =
      (!hasTokenExpired && existingToken?.token) ||
      sign({ id }, JWT_SECRET_KEY as string, {
        expiresIn: "90d",
      });

    if (hasTokenExpired) {
      await prisma.refreshToken.update({
        where: {
          userId: id,
        },
        data: {
          token: refresh_token,
          expires_in: dayjs().add(90, "d").toDate(),
        },
      });
    }

    setCookie("access_token", access_token, {
      req,
      res,
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "strict",
      expires: dayjs().add(15, "m").toDate(),
    });

    setCookie("refresh_token", refresh_token, {
      req,
      res,
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "strict",
      expires: dayjs().add(90, "d").toDate(),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export { generateTokens };
