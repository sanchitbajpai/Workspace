import jwt from "jsonwebtoken";
import { env } from "../config/env";

export const generateAccessToken = (
  userId: string
) => {
  return jwt.sign(
    { userId },
    env.accessSecret,
    {
      expiresIn: "15m"
    }
  );
};
