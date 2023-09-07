import { NextApiRequest, NextApiResponse } from "next";
import { requestMethod } from "@/middlewares/requestMethod";
import { deleteCookie } from "cookies-next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    deleteCookie("access_token", {
      req,
      res,
    });
    deleteCookie("refresh_token", {
      req,
      res,
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default requestMethod(["GET"])(handler);
