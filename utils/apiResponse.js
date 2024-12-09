export const successResponse = (res, statusCode, returnBody) => {
  res.status(statusCode).json(returnBody);
};
export const errorResponse = (res, statusCode, returnBody) => {
  res.status(statusCode).json(returnBody);
};
