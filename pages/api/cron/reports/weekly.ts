import { prisma } from "@/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import dayjs from "dayjs";
import { resend } from "@/configs/resend";
import UsageReport from "@/emails/usage-report";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const projects = await prisma.project.findMany({
    where: { sendWeeklyReports: true },
    include: {
      user: {
        select: { name: true, email: true },
      },
    },
  });

  if (!projects) return res.status(404).json({ message: "No projects found" });

  const createdAt = {
    gte: dayjs().subtract(7, "day").toDate(),
  };

  for (const project of projects) {
    const totalLogs = await prisma.log.count({
      where: {
        projectId: project.id,
        createdAt,
      },
    });
    const topEndpoints = await prisma.log.groupBy({
      by: ["endpoint"],
      where: {
        createdAt,
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

    const averageResponseTime = await prisma.log.aggregate({
      _avg: { elapsedDuration: true },
      where: { createdAt },
    });

    const requestsByMethod = await prisma.log.groupBy({
      by: ["method"],
      where: {
        createdAt,
      },
      _count: {
        method: true,
      },
      orderBy: {
        _count: {
          method: "desc",
        },
      },
      take: 10,
    });

    const data = {
      totalLogs,
      averageResponseTime:
        averageResponseTime._avg.elapsedDuration?.toFixed(0) + "ms",
      topEndpointLogs,
      requestsByMethod: requestsByMethod.map((method) => ({
        method: method.method,
        count: method._count.method,
      })),
    };

    await resend.sendEmail({
      from: "LogDrop <hello@logdrop.co>",
      to: project.user.email,
      subject: `Weekly Report for - ${project.name}`,
      react: UsageReport(),
    });
  }
  res.status(200).send(`
  Email sent to ${projects.map((project) => project.user.email).join(", ")}
  `);
};

export default handler;
