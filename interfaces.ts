import { NextApiRequest } from "next";

export interface CustomRequest extends NextApiRequest {
  user?: { id: number };
}
