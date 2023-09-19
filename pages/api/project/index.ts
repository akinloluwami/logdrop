import { NextApiResponse } from "next";
import { requestMethod } from "@/middlewares/requestMethod";
import { CustomRequest } from "@/interfaces";
import authenticateToken from "@/middlewares/auth";
import { prisma } from "@/prisma";
import validator from "validator";
import { generateApiKey } from "@/utils/generateApiKey";
import dayjs from "dayjs";

const handler = async (req: CustomRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      const { name, apiUrl, from } = req.body;

      if (!name || !apiUrl) {
        res.status(400).json({
          message: "Project name and API URL are required",
        });
        return;
      }

      if (!validator.isURL(apiUrl))
        return res.status(400).json({
          message: "Invalid API URL",
        });

      const projects = await prisma.project.findMany({
        where: {
          userId: req.user?.id,
        },
      });

      const user = await prisma.user.findUnique({
        where: {
          id: req.user?.id,
        },
      });

      if (projects.length > 1 && user?.plan === "free") {
        res.status(400).json({
          message: "You can have a maximum of 2 projects. Upgrade to Pro",
        });
        return;
      }

      if (projects.length !== 0 && from === "onboarding") {
        res.status(201).json({
          message: "Project already created",
        });
        return;
      }

      let slug = name.toLowerCase().replace(/[^a-zA-Z0-9]/g, "-");
      console.log(slug);

      if (
        (await prisma.project.count({
          where: { slug: slug, userId: req.user?.id },
        })) > 0
      ) {
        slug = slug + "-" + Math.floor(Math.random() * 100000);
      }

      const newProject = await prisma.project.create({
        data: {
          name,
          apiUrl,
          userId: req?.user?.id!,
          slug,
        },
      });

      await prisma.aPiKey.create({
        data: {
          key: generateApiKey(),
          projectId: newProject.id,
        },
      });
      res.status(201).json({
        message: "Project created successfully",
        project: {
          name: newProject.name,
          apiUrl: newProject.apiUrl,
          id: newProject.id,
          slug,
        },
      });
      return;
    }

    if (req.method === "GET") {
      const projects = await prisma.project.findMany({
        where: {
          userId: req.user?.id,
        },
        select: {
          name: true,
          apiUrl: true,
          slug: true,
          id: true,
          createdAt: true,
          _count: {
            select: {
              logs: true,
            },
          },
        },
      });

      const selectedDate = dayjs();
      const logCounts: number[] = [];

      const startTime = selectedDate.startOf("day");

      const intervalDuration = 30;

      for (let i = 0; i < 48; i++) {
        const intervalStart = startTime.add(intervalDuration * i, "minutes");
        const intervalEnd = intervalStart.add(intervalDuration, "minutes");

        const logCount = await prisma.log.count({
          where: {
            projectId: { in: projects.map((project) => project.id) },
            createdAt: {
              gte: intervalStart.toDate(),
              lt: intervalEnd.toDate(),
            },
          },
        });
        logCounts.push(logCount);
      }

      const result = projects.map((project) => ({
        name: project.name,
        apiUrl: project.apiUrl,
        id: project.id,
        slug: project.slug,
        createdAt: project.createdAt,
        logs: project._count.logs,
        sparkline: logCounts,
      }));

      res.json(result);
      return;
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
