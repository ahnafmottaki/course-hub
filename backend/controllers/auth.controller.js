import { validationResult, matchedData } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResonse.js";
import cloudinary from "../config/cloudinary.js";
import User from "../models/User.model.js";

const cookieSettings = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
};

export const postRegister = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessage = errors.array()[0]?.msg || "Validation Error";
    return next(new AppError(errorMessage, 400));
  }
  const data = matchedData(req);
  const doesUserExist = await User.findByEmail(data.email);
  if (doesUserExist) {
    return next(
      new AppError("User with this email address already exists", 409)
    );
  }
  let profilePublicId;
  const profilePic = await new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "coursehub_uploads" },
      (error, result) => {
        if (error) {
          return reject(new AppError("Upload Failed", 500));
        }
        profilePublicId = result.public_id;
        resolve(result.secure_url);
      }
    );
    uploadStream.end(req.file.buffer);
  });
  let user;
  try {
    user = await new User({
      email: data.email,
      password: data.password,
      profilePic,
      name: data.name,
    }).save();
  } catch (err) {
    await cloudinary.uploader.destroy(profilePublicId);
    return next(new AppError("Server Error , Try Again Later", 500));
  }

  const payload = { userId: user._id, role: user.role };
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.cookie("token", accessToken, {
    maxAge: 1 * 60 * 60 * 1000,
    ...cookieSettings,
  });
  const resData = {
    ...payload,
    profilePic: user.profilePic,
    name: user.name,
  };
  new ApiResponse(201, "Sign In Successful", resData).send(res);
});

export const postLogout = asyncHandler(async (req, res) => {
  res.clearCookie("token", {
    ...cookieSettings,
  });
  new ApiResponse(200, "Logout successful", null).send(res);
});

export const postLogin = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessage = errors.array()[0]?.msg || "Validation Error";
    return next(new AppError(errorMessage, 400));
  }
  const data = matchedData(req);
  const user = await User.getCollection().findOne({ email: data.email });
  if (!user) {
    return next(new AppError("User doesn't exists", 400));
  }

  const isValidPassword = await bcrypt.compare(data.password, user.password);
  if (!isValidPassword) {
    return next(new AppError("Invalid Email or Password!", 400));
  }
  const payload = { userId: user._id, role: user.role };
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.cookie("token", accessToken, {
    maxAge: 1 * 60 * 60 * 1000,
    ...cookieSettings,
  });
  const resData = {
    ...payload,
    profilePic: user.profilePic,
    name: user.name,
  };
  new ApiResponse(200, "Login Successful", resData).send(res);
});

export const postIsUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.userId);
  new ApiResponse(200, "User is available", {
    userId: user.id,
    role: user.role,
    profilePic: user.profilePic,
    name: user.name,
  }).send(res);
});
