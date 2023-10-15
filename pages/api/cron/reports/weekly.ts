import { prisma } from "@/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import dayjs from "dayjs";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const projects = await prisma.project.findMany({
    where: { sendWeeklyReports: true },
  });

  for (const project of projects) {
    const totalLogs = await prisma.log.count({
      where: {
        projectId: project.id,
        createdAt: {
          gte: dayjs().subtract(7, "day").toDate(),
        },
      },
    });
    const topEndpoints = await prisma.log.groupBy({
      by: ["endpoint"],
      where: {
        createdAt: {
          gte: dayjs().subtract(7, "day").toDate(),
        },
      },
      _count: {
        endpoint: true,
      },
      orderBy: {
        _count: {
          endpoint: "desc",
        },
      },
      take: 10,
    });

    const topEndpointLogs = topEndpoints.map((endpoint) => ({
      endpoint: endpoint.endpoint,
      logs: endpoint._count.endpoint,
    }));

    const data = { totalLogs, topEndpointLogs };
    //send email to project owner
  }
  res.status(200).json(projects);
};

export default handler;
