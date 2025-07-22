import asyncHandler from "../utils/asyncHandler.js";

export const register = asyncHandler(async (req, res, next) => {
  const { email, password, name } = req.body;
});
