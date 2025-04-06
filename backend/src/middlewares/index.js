module.exports = {
  catchAsyncError: require("./catchAsyncError.middleware"),
  ErrorMiddleware: require("./error.middleware"),
  AuthMiddleware: require("./auth.middleware"),
  RateLimitter: require("./rateLimit.middleware"),
  SingleUpload:require("./multer.middleware"),
};
