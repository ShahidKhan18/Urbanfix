const { StatusCodes } = require("http-status-codes");
const { ZodError } = require("zod");
const { ErrorResponse } = require("../utils/common");
const { AppError } = require("../utils");
const { Logger } = require("../config");

const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  err.message = err.message || "Internal Server Error";

  ErrorResponse.data = {};

  let explanation = [];

  switch (err.name) {
    case "ZodError":
      explanation = err.errors.map((e) => `${e.path.join(".")}: ${e.message}`);
      ErrorResponse.message = "Validation Error (Zod)";
      break;

    case "ValidationError":
      explanation = Object.values(err.errors).map((e) => e.message);
      ErrorResponse.message = "Validation Error (Mongoose)";
      break;

    case "CastError":
      explanation = [`Invalid ${err.path}: ${err.value}`];
      ErrorResponse.message = "Invalid ID Format";
      break;

    default:
      if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        explanation = [`${field} must be unique`];
        ErrorResponse.message = "Duplicate Field Error";
      } else if (err instanceof AppError) {
        ErrorResponse.message = err.message;
        explanation = err.explanation;
      } else {
        Logger.error(err);
        ErrorResponse.message = "Internal Server Error";
        explanation = err.stack?.match(
          /^(\w+Error): (.+?)\n\s+at .*?([\w-]+\.js):\d+:\d+/
        )
          ? [`${RegExp.$2} at ${RegExp.$3}`]
          : [err.message];
      }
  }

  ErrorResponse.error.explanation = explanation;
  return res.status(err.statusCode).json(ErrorResponse);
};

module.exports = errorMiddleware;
