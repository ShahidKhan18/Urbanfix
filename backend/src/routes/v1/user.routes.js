const express = require("express");
const { UserController } = require("../../controllers");
const { AuthMiddleware,RateLimitter } = require("../../middlewares/");

const router = express.Router();

router.post("/register", UserController.create); // Inherited from BaseController
router.post("/login",RateLimitter.loginLimiter, UserController.login);
router.post("/refresh-token", UserController.refreshAccessToken);
router.get("/profile", AuthMiddleware.authenticateUser, UserController.findById); // Fetch user profile

module.exports = router;
