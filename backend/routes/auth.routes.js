import express from "express";
import { register } from "../controllers/auth.controller.js";
import multerMiddleware from "../middlewares/multer.js";
import { body } from "express-validator";
const router = express.Router();

router.post(
  "/register",
  multerMiddleware().single("profilePic"),
  [
    body("name").trim().notEmpty().isLength({
      min: 6,
      max: 18,
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
  register
);

export default router;
