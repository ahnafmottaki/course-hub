const errorMiddleware = (error, req, res, next) => {
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
