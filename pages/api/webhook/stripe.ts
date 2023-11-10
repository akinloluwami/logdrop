import { NextApiRequest, NextApiResponse } from "next";
import { requestMethod } from "@/middlewares/requestMethod";
import { prisma } from "@/prisma";
import { Stripe } from "stripe";

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

  const stripe = new Stripe(process.env.STRIPE_API_KEY!);
};

export default requestMethod(["POST"])(handler);
