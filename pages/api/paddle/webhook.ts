import { NextApiRequest, NextApiResponse } from "next";
import { requestMethod } from "@/middlewares/requestMethod";
import { prisma } from "@/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {};

export default requestMethod(["GET"])(handler);
