import { requestMethod } from "@/middlewares/requestMethod";
import { prisma } from "@/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const projects = await prisma.project.findMany();

    for (const project of projects) {
      await prisma.project.update({
        where: { id: project.id },
        data: {
          slug: project.name.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase(),
        },
      });
    }
    res.status(200).json({ projects });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default requestMethod(["GET"])(handler);
