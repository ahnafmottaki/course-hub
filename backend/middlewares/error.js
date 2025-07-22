import asyncHandler from "../utils/asyncHandler.js";

const errorMiddleware = asyncHandler((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Something went wrong";
  res.status(statusCode).json({
    message,
  });
});

export default errorMiddleware;
