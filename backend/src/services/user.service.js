const BaseService = require("./base.service");
const { User } = require("../models");
const {
  JWTUtils: { generateAccessToken, generateRefreshToken },
} = require("../utils");
const bcrypt = require("bcryptjs");
const { AppError } = require("../utils");
const { UserValidation } = require("../validations");

class UserService extends BaseService {
  constructor() {
    super(User, UserValidation.userRegisterSchema); // Pass model & validation schema
  }

  async login(userData, res) {
    const user = await User.findOne({ email: userData.email }).select(
      "+password +refreshToken"
    );
    if (!user) throw new AppError("Invalid email or password", 401);

    const isPasswordMatch = await bcrypt.compare(
      userData.password,
      user.password
    );
    if (!isPasswordMatch) throw new AppError("Invalid email or password", 401);

    // Generate new access and refresh tokens
    const accessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    // Store new refresh token & remove old one
    user.refreshToken = newRefreshToken;
    await user.save();

    // Send refresh token in HTTP-only secure cookie
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure in production
      sameSite: "Strict", // Prevent CSRF attacks
      maxAge: 365 * 24 * 60 * 60 * 1000, // 1 Year
    });

    return { accessToken };
  }

  async refreshAccessToken(refreshToken) {
    const user = await User.findOne({ refreshToken });
    if (!user) throw new AppError("Invalid refresh token", 403);
    return { accessToken: generateAccessToken(user) };
  }
}

module.exports = new UserService();
