import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { errorResponse, successResponse } from "../utils/apiResponse.js";
import { constants } from "../utils/constants.js";
import {
  dbCreateNewUser,
  dbGetUserByEmail,
} from "../dbAccessor/userDbAccessor.js";

const RESOURCE_CREATED_SUCCESS = constants.STATUS_CODE.RESOURCE_CREATED_SUCCESS;
const CONFLICT_ERROR_STATUS_CODE = constants.STATUS_CODE.RESOURCE_CONFLICT;
const UNAUTHORISED_STATUS_CODE = constants.STATUS_CODE.UNAUTHORISED;
const INTERNAL_SERVER_ERROR_CODE = constants.STATUS_CODE.INTERNAL_SERVER;
const SUCCESS_CODE = constants.STATUS_CODE.SUCCESS;

// Signup
export const signup = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    const existingUser = await dbGetUserByEmail({ email });
    if (existingUser) {
      return errorResponse(res, CONFLICT_ERROR_STATUS_CODE, {
        message: "User already exists",
      });
    }

    await dbCreateNewUser({ email, name, password });

    return successResponse(res, RESOURCE_CREATED_SUCCESS, {
      message: "User registered successfully",
    });
  } catch (err) {
    console.error("Error while signing up the user: ", err);
    return errorResponse(res, INTERNAL_SERVER_ERROR_CODE, {
      message: "Error while signing up. Please try again later.",
    });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await dbGetUserByEmail({ email });
    if (!user) {
      return errorResponse(res, UNAUTHORISED_STATUS_CODE, {
        message: "No user with this email exists.",
      });
    }

    if (password === user.password)
      return successResponse(res, SUCCESS_CODE, {
        message: "Logged in successfully",
      });
    return successResponse(res, UNAUTHORISED_STATUS_CODE, {
      message: "Passsword doesn't match",
    });
  } catch (err) {
    console.error("Error while logging the user in: ", err);
    return errorResponse(res, INTERNAL_SERVER_ERROR_CODE, {
      message: "Error while logging in. Please try again later.",
    });
  }
};
