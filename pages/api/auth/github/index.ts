import { NextApiRequest, NextApiResponse } from "next";
import { requestMethod } from "@/middlewares/requestMethod";
import { GITHUB_CLIENT_ID } from "@/lib/secrets";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user:email`
  );
};

export default requestMethod("GET")(handler);
