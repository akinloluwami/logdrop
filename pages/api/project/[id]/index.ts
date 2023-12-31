import { NextApiResponse } from "next";
import { requestMethod } from "@/middlewares/requestMethod";
import { CustomRequest } from "@/interfaces";
import authenticateToken from "@/middlewares/auth";
import { prisma } from "@/prisma";
import validator from "validator";

const handler = async (req: CustomRequest, res: NextApiResponse) => {
  try {
    if (req.method === "PATCH") {
      const projectId = Number(req.query.id);

      if (!projectId) {
        res.status(400).json({
          message: "Project ID is required",
        });
        return;
      }

      const { name, apiUrl, slug } = req.body;

      if (name) {
        await prisma.project.update({
          where: {
            id: projectId,
          },
          data: {
            name,
          },
        });
      }
      if (apiUrl) {
        if (!validator.isURL(apiUrl))
          res.status(400).json({
            message: "Invalid API URL",
          });

        await prisma.project.update({
          where: {
            id: projectId,
          },
          data: {
            apiUrl,
          },
        });
      }
      if (slug) {
        if (!validator.isAlphanumeric(slug)) {
          res.status(400).json({
            message: "Slug must be alphanumeric",
          });
          return;
        }

        if (
          await prisma.project.count({
            where: { slug: slug, userId: req.user?.id },
          })
        ) {
          res.status(400).json({
            message: "Slug is already taken, try another one",
          });
          return;
        }

        await prisma.project.update({
          where: {
            id: projectId,
          },
          data: {
            slug,
          },
        });
      }

      res.status(200).json({
        message: "Project updated successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default requestMethod(["PATCH", "GET"])((
  req: CustomRequest,
  res: NextApiResponse
) => {
  authenticateToken(req, res, () => handler(req, res));
});
