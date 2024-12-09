import { errorResponse } from "../utils/apiResponse.js";
import { constants } from "../utils/constants.js";

const BAD_REQUEST_ERROR = constants.STATUS_CODE.BAD_REQUEST_ERROR;

export const validateRequest = (schema) => {
  return (req, res, next) => {
    try {
      schema.parse(req);
      next();
    } catch (error) {
      console.error("Error while validating request: ", error);
      return errorResponse(res, BAD_REQUEST_ERROR, {
        message: "Invalid Inputs!",
        errors: error.errors,
      });
    }
  };
};
