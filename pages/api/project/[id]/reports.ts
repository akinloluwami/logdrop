import { NextApiResponse } from "next";
import { requestMethod } from "@/middlewares/requestMethod";
import { CustomRequest } from "@/interfaces";
import authenticateToken from "@/middlewares/auth";
import { prisma } from "@/prisma";
import dayjs from "dayjs";

const handler = async (req: CustomRequest, res: NextApiResponse) => {
  try {
    const interval = req.query.interval.toLowerCase() as "weekly" | "monthly";

    if (interval) {
      res.status(400).json({
        message: "",
      });

      return;
    }

    if (interval !== "weekly" || interval !== "monthly") {
      return res.status(400).json({
        message: "Invalid interval",
      });
    }
  } catch (error) {}
};
