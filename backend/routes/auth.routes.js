import express from "express";
import {
  postRegister,
  postIsUser,
  postLogout,
  postLogin,
} from "../controllers/auth.controller.js";
import multerMiddleware from "../middlewares/multer.js";
import { body } from "express-validator";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

// api/auth/register
router.post(
  "/register",
  multerMiddleware().single("image"),
  [
    body("name").trim().notEmpty().isLength({
      min: 6,
      max: 20,
    }),
    body("email")
      .trim()
      .notEmpty()
      .toLowerCase()
      .custom((value) => {
        return /^[a-zA-Z][a-zA-Z0-9._]*@gmail.com$/.test(value);
      }),
    body("password").trim().notEmpty().isLength({
      min: 6,
      max: 18,
    }),
  ],
  postRegister
);

// api/auth/login
router.post(
  "/login",
  [
    body("email")
      .trim()
      .notEmpty()
      .toLowerCase()
      .custom((value) => {
        return /^[a-zA-Z][a-zA-Z0-9._]*@gmail.com$/.test(value);
      }),
    body("password").trim().notEmpty().isLength({
      min: 6,
      max: 18,
    }),
  ],
  postLogin
);

// api/auth/logout
router.post("/logout", postLogout);

// api/auth/isUser
router.post("/isUser", verifyToken, postIsUser);

export default router;
