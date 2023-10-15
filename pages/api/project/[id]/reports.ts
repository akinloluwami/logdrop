import { NextApiResponse } from "next";
import { requestMethod } from "@/middlewares/requestMethod";
import { CustomRequest } from "@/interfaces";
import authenticateToken from "@/middlewares/auth";
import { prisma } from "@/prisma";
import dayjs from "dayjs";

const handler = async (req: CustomRequest, res: NextApiResponse) => {
  try {
    const interval = String(req.query.interval).toLowerCase();
    const projectId = Number(req.query.id);

    if (!projectId) {
      res.status(400).json({
        message: "Project ID is required",
      });
      return;
    }

    if (!interval) {
      res.status(400).json({
        message: "",
      });

      return;
    }

    if (interval !== "weekly" && interval !== "monthly") {
      return res.status(400).json({
        message: "Invalid interval",
      });
    }

    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
      },
    });

    if (interval === "weekly") {
      await prisma.project.update({
        where: {
          id: projectId,
        },
        data: {
          sendWeeklyReports: !project?.sendWeeklyReports,
        },
      });
    }

    res.status(200).json({
      message: "Successfully updated",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong.",
    });
  }
};

export default requestMethod(["PATCH"])(
  (req: CustomRequest, res: NextApiResponse) => {
    authenticateToken(req, res, () => handler(req, res));
  }
);
