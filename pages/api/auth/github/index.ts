import { GITHUB_CLIENT_ID } from "@/lib/secrets";
import { NextApiRequest, NextApiResponse } from "next";
import { allowMethods } from "next-method-guard";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user:email`
  );
};

// @ts-ignore
export default allowMethods(["GET"])(handler);
