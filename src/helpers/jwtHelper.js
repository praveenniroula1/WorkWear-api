import jwt from "jsonwebtoken";
import { UpdateOneAdminUser } from "../models/adminUser/AdminUserModel.js";
import {
  deleteSession,
  insertSession,
} from "../models/session/SessionModel.js";

export const signAccessJwt = async (payload) => {
  const accessJWT = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });
  const obj = {
    token: accessJWT,
    type: "jwt",
  };
  await insertSession(obj);
  return accessJWT;
};
export const signRefreshJwt = async (payload) => {
  const refreshJWT = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "30d",
  });

  await UpdateOneAdminUser(payload, { refreshJWT });
  return refreshJWT;
};

export const createJWT = async (payload) => {
  return {
    accessJWT: await signAccessJwt(payload),
    refreshJWT: await signRefreshJwt(payload),
  };
};
export const verifyAccessJwt = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  } catch ({ message }) {
    if (message === "jwt expired!!!") {
      deleteSession({
        type: "jwt",
        token,
      });
    }
    return message;
  }
};
export const verifyRefreshJwt = (token) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
};
