import jwt from "jsonwebtoken";
import { Response } from "express";
import { env } from "../config/env";

export const generateToken = (id: number, role: string): string => {
  return jwt.sign({ id, role }, env.jwtSecret, {
    expiresIn: "15d",
  });
};

export const setTokenCookie = (res: Response, token: string): void => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: env.nodeEnv === "production",
    sameSite: "lax",
    maxAge: 15 * 24 * 60 * 60 * 1000,
  });
};
