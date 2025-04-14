import jwt from "jsonwebtoken";
import crypto from "crypto";
import { PrismaClient } from "@prisma/client";
import logger from "./logger.js";

const prisma = new PrismaClient();
const generateTokens = async (payload) => {
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  const refreshToken = crypto.randomBytes(64).toString("hex");
  const expiresAt = Date.now() + 1000 * 60 * 60 * 24 * 7;

  await prisma.session.create({
    data: {
      token: refreshToken,
      user_id: payload.id,
      expires_at: new Date(expiresAt).toISOString(),
    },
  });
  logger.info("Tokens generated");

  return { accessToken, refreshToken };
};

export default generateTokens;
