import { NextApiRequest, NextApiResponse } from "next";

const requestMethod = (method: "GET" | "POST" | "DELETE" | "PATH") => {
  return (handler: any) => (req: NextApiRequest, res: NextApiResponse) => {
    if (method !== req.method) {
      res.status(405).json({
        error: "Method Not Allowed",
        message: `This endpoint only supports ${method}, while your request was: ${req.method}`,
      });
      return;
    }
    return handler(req, res);
  };
};

export { requestMethod };
