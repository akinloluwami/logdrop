import { CustomRequest } from "@/interfaces";
import authenticateToken from "@/middlewares/auth";
import { requestMethod } from "@/middlewares/requestMethod";
import type { NextApiRequest, NextApiResponse } from "next";

function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const result = "";

    if (!result) {
      res.status(400).send({ error: "failed to fetch data" });
      return;
    }

    res.status(200).send({ result });
  } catch (err) {
    res.status(500).send({ error: "failed to fetch data" });
  }
}

export default requestMethod(["GET"])((
  req: CustomRequest,
  res: NextApiResponse
) => {
  authenticateToken(req, res, () => handler(req, res));
});
