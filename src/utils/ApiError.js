class ApiError extends Error {
  constructor(statusCode, message, message_dev = '', isOperational = true, stack = '') {
    super(message);

    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (statusCode == 500) {
      if (message == 'jwt expired') {
        this.message = 'Your session has expired. Please login again.';
        this.message_dev = message;
      } else {
        this.message =
          'An unexpected error has occurred. To solve the issue, contact the person responsible for your Server.';
        this.message_dev = message;
      }
    } else {
      this.message_dev = message_dev;
    }

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = ApiError;
