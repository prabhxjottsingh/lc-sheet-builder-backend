import { JWT_SECRET } from "../server.js";
import { errorResponse } from "../utils/apiResponse.js";
import { constants } from "../utils/constants.js";
import jwt from "jsonwebtoken";

const UNAUTHORISED = constants.STATUS_CODE.UNAUTHORISED;

export const decryptAuthToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return errorResponse(res, UNAUTHORISED, {
      message: "Auth Token missing",
    });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    return errorResponse(res, UNAUTHORISED, {
      message: "Invalid or expired token",
    });
  }
};
