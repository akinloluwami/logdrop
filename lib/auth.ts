import { jwtVerify } from "jose";
import { JWT_SECRET_KEY } from "./secrets";

export const getJwtSecret = () => {
  const secret = JWT_SECRET_KEY;
  if (!secret) {
    throw new Error("Refresh token secret not found");
  }
  return secret;
};

export const verifyAuth = async (token: string) => {
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(getJwtSecret())
    );
    return verified.payload as { id: number };
  } catch (error) {
    throw new Error("Invalid token");
  }
};
