import { NextApiRequest, NextApiResponse } from "next";
import { requestMethod } from "@/middlewares/requestMethod";
import { prisma } from "@/prisma";
import { Stripe } from "stripe";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // const {
  //   event_type,
  //   data,
  // }: {
  //   event_type: string;
  //   data: {
  //     items: any;
  //     id: string;
  //     customer_id: string;
  //   };
  // } = req.body;

  const tiers = [
    {
      sub_id: "sub_1OAqx8CqizJngwvWFVW5A4A9",
      quota: 15000,
    },
    {
      sub_id: "",
      quota: 50000,
    },
    {
      sub_id: "",
      quota: 100000,
    },
    {
      sub_id: "",
      quota: 150000,
    },
    {
      sub_id: "",
      quota: 250000,
    },
    {
      sub_id: "",
      quota: 650000,
    },
    {
      sub_id: "",
      quota: 1300000,
    },
    {
      sub_id: "",
      quota: 2300000,
    },
    {
      sub_id: "",
      quota: 3500000,
    },
    {
      sub_id: "",
      quota: 5000000,
    },
    {
      sub_id: "",
      quota: 8000000,
    },
    {
      sub_id: "",
      quota: 10000000,
    },
  ];
  // console.log(event_type);

  new Stripe(process.env.STRIPE_API_KEY!);

  const event = req.body as Stripe.Event;

  const checkout = event.data.object as Stripe.Checkout.Session;

  // if (!checkout.customer) {
  //   return res.status(400).send("Missing item in webhook callback.");
  // }

  const stripeId = String(checkout.customer);

  console.log("====================================");
  console.log(event);
  console.log("====================================");

  res.status(200).send("ok");
};

export default requestMethod(["POST"])(handler);
