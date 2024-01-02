const ApiError = require("./ApiError");

const catchModelErrors = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    let error;
    if (err.code === 11000 && err?.keyPattern && Object.keys(err?.keyPattern).length) {
      const message = "Blog " + Object.keys(err.keyPattern).join(', ') + ' has already been taken';
      error = new ApiError(400, message);
    }
    next(error || err);
  });
};

module.exports = catchModelErrors;
