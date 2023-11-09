import { NextApiRequest, NextApiResponse } from "next";
import { requestMethod } from "@/middlewares/requestMethod";
import { prisma } from "@/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    event_type,
    data,
  }: {
    event_type: string;
    data: {
      items: any;
      id: string;
      customer_id: string;
    };
  } = req.body;

  const tiers = [
    {
      id: "pro_01hawzmmjgvtg53pzk6ha9mw94",
      quota: 15000,
    },
  ];
  console.log(event_type);
};

export default requestMethod(["POST"])(handler);
