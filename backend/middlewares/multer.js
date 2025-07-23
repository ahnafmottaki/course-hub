import multer from "multer";
import { v4 as uuid } from "uuid";
import AppError from "../utils/AppError.js";

const supportedFormats = ["image/jpg", "image/jpeg", "image/png"];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/images");
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".").pop();
    cb(null, uuid() + "." + ext);
  },
});
const multerMiddleware = () =>
  multer({
    storage,
    fileFilter(req, file, cb) {
      const isDesiredFormat = supportedFormats.includes(file.mimetype);
      if (isDesiredFormat) {
        cb(null, true);
      } else {
        cb(
          new AppError("Only jpeg, png and jpg file are supported", 415),
          false
        );
      }
    },
    limits: {
      fileSize: 5 * 1024 * 1024,
    },
  });

export default multerMiddleware;
