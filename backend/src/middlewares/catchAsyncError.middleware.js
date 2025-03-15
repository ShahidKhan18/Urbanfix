const catchAsyncError = (cb) => (req, res, next) => {
  Promise.resolve(cb(req, res, next)).catch(next);
};

module.exports = catchAsyncError;
