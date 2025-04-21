const express = require("express");
const { UserController } = require("../../controllers");
const { AuthMiddleware,RateLimitter } = require("../../middlewares/");

const router = express.Router();

router.post("/register", UserController.create); // Inherited from BaseController
router.post("/login", UserController.login);
router.post("/refresh-token", UserController.refreshAccessToken);
router.get("/profile", AuthMiddleware.authenticateUser, UserController.findById); // Fetch user profile
router.get("/complaints", AuthMiddleware.authenticateUser, UserController.getUserComplainets); // Fetch user complaints
router.get("/logout", AuthMiddleware.authenticateUser, UserController.logout); // Logout user
module.exports = router;
