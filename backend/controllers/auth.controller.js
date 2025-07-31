import { validationResult, matchedData } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/User.model.js";
import ApiResponse from "../utils/ApiResonse.js";
import cloudinary from "../config/cloudinary.js";

export const postRegister = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstErrorMessage = errors[0].msg.split(" ")[0] + errors[0].path;
    return next(new AppError(firstErrorMessage, 400));
  }
  const data = matchedData(req);
  const doesUserExist = await User.findOne({ email: data.email });
  if (doesUserExist) {
    return next(
      new AppError("User with this email address already exists", 409)
    );
  }
  const profilePic = await new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "coursehub_uploads" },
      (error, result) => {
        if (error) {
          return reject(new AppError("Upload Failed", 500));
        }
        resolve(result.secure_url);
      }
    );
    uploadStream.end(req.file.buffer);
  });
  const hashedPassword = await bcrypt.hash(data.password, 12);
  const user = await new User({
    name: data.name,
    email: data.email,
    password: hashedPassword,
    profilePic,
    role: "student",
  }).save();
  const payload = { userId: user._id, role: user.role };
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.cookie("token", accessToken, {
    maxAge: 1 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  const resData = {
    userId: user.id,
    role: user.role,
    profilePic: user.profilePic,
    name: user.name,
  };
  new ApiResponse(201, "Sign In Successful", resData).send(res);
});

export const postLogout = asyncHandler(async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  new ApiResponse(200, "Logout successful", null).send(res);
});

export const postLogin = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessage = errors[0].msg.split(" ")[0] + errors[0].path;
    return next(new AppError(errorMessage, 400));
  }
  const data = matchedData(req);
  const user = await User.findOne({ email: data.email });
  if (!user) {
    return next(new AppError("User doesn't exists", 400));
  }

  const isValidPassword = bcrypt.compare(data.password, user.password);
  if (!isValidPassword) {
    return next(new AppError("Invalid Email or Password!", 400));
  }
  const payload = { userId: user._id, role: user.role };
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.cookie("token", accessToken, {
    maxAge: 1 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  const resData = {
    userId: user.id,
    role: user.role,
    profilePic: user.profilePic,
    name: user.name,
  };
  new ApiResponse(200, "Login Successful", resData).send(res);
});

export const getIsUser = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ _id: req.user.userId });
  new ApiResponse(200, "User is available", {
    userId: user.id,
    role: user.role,
    profilePic: user.profilePic,
    name: user.name,
  }).send(res);
});
