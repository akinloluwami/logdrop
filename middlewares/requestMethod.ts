import { NextApiRequest, NextApiResponse } from "next";

const requestMethod = (methods: string[]) => {
  return (handler: any) => (req: NextApiRequest, res: NextApiResponse) => {
    if (!methods.includes(req.method!)) {
      res.status(405).json({
        error: "Method Not Allowed",
        message: `This endpoint only supports ${methods.join(
          " ,"
        )}, while your request was: ${req.method}`,
      });
      return;
    }
    return handler(req, res);
  };
};

export { requestMethod };
