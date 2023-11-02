import type { NextApiRequest, NextApiResponse } from "next";

function handler(req: NextApiRequest, res: NextApiResponse) {
  return res.json({
    message: "Hello World!",
  });
}

export default handler;
