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

  if (event_type === "subscription.created") {
    const user = await prisma.user.findUnique({
      where: {
        paddleCustomerId: data.customer_id,
      },
    });
    if (user) {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          billingCycleStart: new Date().getDate(),
          logsQuota: tiers.find(
            (tier) => tier.id === data.items[0].price.product_id
          )?.quota,
          plan: "pro",
        },
      });
    }
  }
  res.status(200).json({ success: true });
};

export default requestMethod(["POST"])(handler);
