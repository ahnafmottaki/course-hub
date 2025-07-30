import fs from "fs";

const errorMiddleware = (error, req, res, next) => {
  // if (req.file) {
  //   fs.unlink(req.file.path, (err) => {
  //     console.log("file deletion error: ", err);
  //   });
  // }
  if (error.isOperational) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  } else {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export default errorMiddleware;
