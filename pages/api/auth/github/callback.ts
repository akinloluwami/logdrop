import { NextApiRequest, NextApiResponse } from "next";
import { requestMethod } from "@/middlewares/requestMethod";
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from "@/lib/secrets";
import axios from "axios";
import { Octokit } from "octokit";
import { prisma } from "@/prisma";
import { generateTokens } from "@/utils/generateTokens";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { code } = req.query;
  try {
    const response = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code,
      }
    );

    const accessToken = new URLSearchParams(response.data).get("access_token");

    if (accessToken) {
      const octokit = new Octokit({
        auth: accessToken,
      });

      const userResponse = await octokit.request("GET /user");

      const userEmails = await octokit.request("GET /user/emails");

      const user = userResponse.data;
      const email = userEmails.data.find((e) => e.primary)?.email;

      const githubUser = await prisma.gitHub.findUnique({
        where: {
          githubId: user.id,
        },
      });

      const userAccount = await prisma.user.findFirst({
        where: {
          github: githubUser,
        },
      });

      const hasCompletedOnboarding = userAccount?.hasCompletedOnboarding;

      if (userAccount && hasCompletedOnboarding) {
        await generateTokens(req, res, userAccount.id);
        return res.redirect("/overview");
      }

      if (userAccount && !hasCompletedOnboarding) {
        await generateTokens(req, res, userAccount.id);
        return res.redirect("/onboarding");
      }

      const newUser = await prisma.user.create({
        data: {
          email: email!,
          name: user.name || "",
        },
      });

      await prisma.gitHub.create({
        data: {
          githubId: user.id,
          userId: newUser.id,
        },
      });

      await generateTokens(req, res, newUser.id);
      res.redirect("/onboarding");
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default requestMethod(["GET"])(handler);
