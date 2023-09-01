import { prisma } from "@/prisma";
import { sign } from "jsonwebtoken";
import { setCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";
import { isProd } from "@/lib/isProd";
import dayjs from "dayjs";

const generateToken = async (
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

    const access_token = sign({ id }, process.env.JWT_SECRET as string, {
      expiresIn: "15m",
    });

    if (existingToken) {
      setCookie("access_token", access_token, {
        req,
        res,
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "none" : "strict",
        expires: dayjs().add(15, "m").toDate(),
      });
      setCookie("refresh_token", existingToken.token, {
        req,
        res,
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "none" : "strict",
        expires: dayjs().add(90, "d").toDate(),
      });
      return;
    }
  } catch (error) {}
};
