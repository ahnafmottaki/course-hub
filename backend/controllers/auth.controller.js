import { validationResult, matchedData } from "express-validator";
import bcrypt from "bcryptjs";

import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/User.model.js";
import ApiResponse from "../utils/ApiResonse.js";

export const register = asyncHandler(async (req, res, next) => {
  await new Promise((res) => setTimeout(res, 3000));

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstErrorMessage = errors[0].msg.split(" ")[0] + errors[0].path;
    return next(new AppError(firstErrorMessage, 400));
  }
  const data = matchedData(req);
  const profilePic = req.file.path;

  const doesUserExist = await User.findOne({ email: data.email });
  if (doesUserExist) {
    return next(
      new AppError("User with this email address already exists", 409)
    );
  }
  const hashedPassword = await bcrypt.hash(data.password, 12);

  const user = await User.create({
    name: data.name,
    email: data.email,
    password: hashedPassword,
    profilePic,
    role: "student",
  });
  new ApiResponse(201, "user created successfully", null).send(res);
});
