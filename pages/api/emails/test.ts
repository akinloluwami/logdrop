import { resend } from "@/configs/resend";
import { requestMethod } from "@/middlewares/requestMethod";
import { NextApiRequest, NextApiResponse } from "next";
import Welcome from "@/emails/welcome";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await resend.emails.send({
      from: "Akinkunmi at LogDrop<akin@logdrop.co>",
      to: "akinkunmioye42@gmail.com",
      subject: "Welcome to LogDrop",
      react: Welcome({ name: "Ak" }),
    });
    res.send("Email sent");
  } catch (error) {
    res.status(500).json(error);
  }
};

export default requestMethod(["POST"])(handler);
