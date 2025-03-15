const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Max 5 login attempts per IP
  message: "Too many login attempts. Please try again later.",
  headers: true,
});

module.exports = {loginLimiter};
