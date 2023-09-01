import { NextApiRequest, NextApiResponse } from "next";
import { requestMethod } from "@/middlewares/requestMethod";
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from "@/lib/secrets";
import axios from "axios";
import { Octokit } from "octokit";

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
      const email = userEmails.data[0].email;
    }
  } catch (error) {}
};

export default requestMethod("POST")(handler);
