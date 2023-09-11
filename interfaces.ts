import { NextApiRequest } from "next";

export interface CustomRequest extends NextApiRequest {
  user?: { id: number };
}

export interface EventProps {
  id: number;
  name: string;
  action: string;
  conditions: [];
  createdAt: string;
  timesTriggered: number;
  lastTriggered: string;
}
