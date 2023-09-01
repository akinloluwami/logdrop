import { NextApiRequest, NextApiResponse } from "next";
import { requestMethod } from "@/middlewares/requestMethod";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
  }
};

export default requestMethod(["POST", "GET"])(handler);
