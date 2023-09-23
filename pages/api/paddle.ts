import { NextApiRequest, NextApiResponse } from "next";
import { requestMethod } from "@/middlewares/requestMethod";
import { prisma } from "@/prisma";
import axios from "axios";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const users = await prisma.user.findMany({
    where: {
      paddleCustomerId: null,
    },
  });

  for (const user of users) {
    try {
      const { data } = await axios.post(
        "https://sandbox-api.paddle.com/customers",
        {
          email: user.email,
        },
        {
          headers: {
            Authorization:
              "Bearer 2b3e9f36636559facb775208310fcf3f930ce2775376a92ca8",
          },
        }
      );
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          paddleCustomerId: data.data.id,
        },
      });
    } catch (error: any) {
      console.log(error.response.data);
    }
  }
  const updatedUsers = await prisma.user.findMany();
  res.status(200).json(updatedUsers);
};

export default requestMethod(["GET"])(handler);
