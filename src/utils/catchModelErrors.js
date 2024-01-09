const ApiError = require('./ApiError');

function catchModelErrors(fn) {
  return async function (req, res, next) {
    try {
      return await Promise.resolve(fn(req, res, next));
    } catch (err) {
      let error;
      if (err.code === 11000 && err?.keyPattern && Object.keys(err?.keyPattern).length) {
        const message_1 = 'Blog ' + Object.keys(err.keyPattern).join(', ') + ' has already been taken';
        error = new ApiError(400, message_1);
      }
      next(error || err);
    }
  };
}

module.exports = catchModelErrors;