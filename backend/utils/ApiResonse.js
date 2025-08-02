class ApiResponse {
  success = true;
  constructor(statusCode, message, data = null) {
    this.statusCode = statusCode;
    this.message = message;
    if (data) this.data = data;
  }

  send(res) {
    return res.status(this.statusCode).json({
      success: this.success,
      message: this.message,
      ...(this.data !== undefined && { data: this.data }),
    });
  }
}

export default ApiResponse;
