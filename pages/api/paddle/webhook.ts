import { NextApiRequest, NextApiResponse } from "next";
import { requestMethod } from "@/middlewares/requestMethod";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("Paddle");
  res.status(200).json({ message: "Hello World!" });
};

export default requestMethod(["GET"])(handler);
