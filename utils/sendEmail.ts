import { resend } from "@/configs/resend";
import FirstRequest from "@/emails/first-request";
import Welcome from "@/emails/welcome";

const from = "Akinkunmi at LogDrop<akin@logdrop.co>";

const sendEmail = {
  welcome: async (email: string, name: string) => {
    await resend.emails.send({
      from,
      to: email,
      subject: "Welcome to LogDrop",
      react: Welcome({ name }),
    });
  },
  firstLog: async (email: string) => {
    await resend.emails.send({
      from,
      to: email,
      subject: "LogDrop: Your First Request - You're Golden 🏆",
      react: FirstRequest(),
    });
  },
};

export { sendEmail };
