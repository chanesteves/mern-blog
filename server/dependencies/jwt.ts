// TODO: Organize configs
import jwt from "jsonwebtoken";
import getConfig from "../config";

export const generateActiveToken = (payload: object) => {
  const config = getConfig();
  return jwt.sign(payload, config.server.services.jwt.active_token_secret, {
    expiresIn: "5m",
  });
};

export const generateAccessToken = (payload: object) => {
  const config = getConfig();
  return jwt.sign(payload, config.server.services.jwt.access_token_secret, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (payload: object) => {
  const config = getConfig();
  return jwt.sign(payload, config.server.services.jwt.refresh_token_secret, {
    expiresIn: "30d",
  });
};

export const verifyActiveToken = (token: string) => {
  const config = getConfig();
  return jwt.verify(`${token}`, config.server.services.jwt.active_token_secret);
};
