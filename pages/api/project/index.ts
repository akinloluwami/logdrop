import { NextApiResponse } from "next";
import { requestMethod } from "@/middlewares/requestMethod";
import { CustomRequest } from "@/interfaces";
import authenticateToken from "@/middlewares/auth";
import { prisma } from "@/prisma";
import validator from "validator";

const handler = async (req: CustomRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      const { name, apiUrl } = req.body;

      if (!name || !apiUrl) {
        res.status(400).json({
          message: "Project name and API URL are required",
        });
        return;
      }

      if (!validator.isURL(apiUrl, { require_protocol: true }))
        res.status(400).json({
          message: "Invalid API URL",
        });

      await prisma.project.create({
        data: {
          name,
          apiUrl,
          userId: req?.user?.id!,
        },
      });
    }

    res.status(201).json({
      message: "Project created successfully",
    });
  } catch (error) {}
};

export default requestMethod(["POST", "GET"])((
  req: CustomRequest,
  res: NextApiResponse
) => {
  authenticateToken(req, res, () => handler(req, res));
});
