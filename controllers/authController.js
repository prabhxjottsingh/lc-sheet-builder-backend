import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { errorResponse, successResponse } from "../utils/apiResponse.js";
import { constants } from "../utils/constants.js";
import {
  dbCreateNewUser,
  dbGetUserByEmail,
} from "../dbAccessor/userDbAccessor.js";
import { JWT_EXPIRATION, JWT_SECRET } from "../index.js";

const RESOURCE_CREATED_SUCCESS = constants.STATUS_CODE.RESOURCE_CREATED_SUCCESS;
const CONFLICT_ERROR_STATUS_CODE = constants.STATUS_CODE.RESOURCE_CONFLICT;
const UNAUTHORISED_STATUS_CODE = constants.STATUS_CODE.UNAUTHORISED;
const INTERNAL_SERVER_ERROR_CODE = constants.STATUS_CODE.INTERNAL_SERVER;
const SUCCESS_CODE = constants.STATUS_CODE.SUCCESS;

const generateToken = (user) => {
  const payload = { _id: user.id, email: user.email };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
};

export const signup = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    const existingUser = await dbGetUserByEmail({ email });
    if (existingUser) {
      return errorResponse(res, CONFLICT_ERROR_STATUS_CODE, {
        message: "User already exists",
      });
    }

    const newUser = await dbCreateNewUser({
      email,
      name,
      password: password,
    });
    const token = generateToken(newUser);
    return successResponse(res, RESOURCE_CREATED_SUCCESS, {
      message: "User registered successfully",
      token,
      userId: newUser._id,
    });
  } catch (err) {
    console.error("Error while signing up the user: ", err);
    return errorResponse(res, INTERNAL_SERVER_ERROR_CODE, {
      message: "Error while signing up. Please try again later.",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await dbGetUserByEmail({ email });
    if (!user) {
      return errorResponse(res, UNAUTHORISED_STATUS_CODE, {
        message: "No user with this email exists.",
      });
    }

    const isPasswordValid = user.password === password;
    if (!isPasswordValid) {
      return errorResponse(res, UNAUTHORISED_STATUS_CODE, {
        message: "Password doesn't match",
      });
    }

    const token = generateToken(user);

    return successResponse(res, SUCCESS_CODE, {
      message: "Logged in successfully",
      data: { token, userId: user._id },
    });
  } catch (err) {
    console.error("Error while logging the user in: ", err);
    return errorResponse(res, INTERNAL_SERVER_ERROR_CODE, {
      message: "Error while logging in. Please try again later.",
    });
  }
};

export const getUserByToken = async (req, res) => {
  try {
    const user = req.user;
    return successResponse(res, SUCCESS_CODE, {
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error while fetching user by token: ", error);
    return errorResponse(res, INTERNAL_SERVER_ERROR_CODE, {
      message: "Error while fetching user by token",
    });
  }
};
