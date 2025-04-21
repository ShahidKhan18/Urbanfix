const BaseService = require("./base.service");
const { User, Complaint, WardOfficer, Ward } = require("../models");
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
    if (userData.role === "citizen") {
      const user = await User.findOne({ email: userData.email }).select(
        "+password +refreshToken"
      );
      if (!user) throw new AppError("Invalid email or password", 401);

      const isPasswordMatch = await bcrypt.compare(
        userData.password,
        user.password
      );
      if (!isPasswordMatch)
        throw new AppError("Invalid email or password", 401);

      // Generate new access and refresh tokens
      const accessToken = generateAccessToken(user);
      const newRefreshToken = generateRefreshToken(user);

      // Store new refresh token & remove old one
      user.refreshToken = newRefreshToken;
      await user.save();

      // Send refresh token in HTTP-only secure cookie
      // res.cookie("refreshToken", newRefreshToken, {
      //   httpOnly: true,
      //   secure: process.env.NODE_ENV === "production", // Secure in production
      //   sameSite: "Lax",
      //   maxAge: 365 * 24 * 60 * 60 * 1000, // 1 Year
      // });

      return {
        accessToken,
        name: user.name,
        email: user.email,
        role: user.role,
        id: user._id,
      }; // Return user info and access token}
    } else if (userData.role === "admin") {
      console.log("Admin login attempt with email:", userData);
      const user =await WardOfficer.findOne({email:userData.email})
      console.log(user)
      if(!user) throw new AppError("Invalid Email ID", 401);
      
       const accessToken = generateAccessToken({...user,role:"admin"});
       return {
         accessToken,
         wardNumber: user.wardNumber,
         name: user.name,
         email: user.email,
         role:"admin",
         id: user._id,
       };
    }
  }

  async refreshAccessToken(refreshToken) {
    const user = await User.findOne({ refreshToken });
    if (!user) throw new AppError("Invalid refresh token", 403);
    return { accessToken: generateAccessToken(user) };
  }

  async logout(userId) {
    
    // const user = await User.findById(userId).select("+refreshToken");
    // if (!user) throw new AppError("User not found", 404);

    // // Clear refresh token
    // user.refreshToken = null;
    // await user.save();
    return true
  }

  async getUserComplaints(userId) {
    const user = await User.findById(userId)
      .populate(
        "complaints",
        "title description createdAt status user wardNumber images"
      )
      .populate({
        path: "upVotedComplaints",
        select: "complaint user count createdAt",
        populate: {
          path: "complaint",
          select: "title description createdAt status user wardNumber images",
          populate: {
            path: "user",
            select: "name email", // Populate the user who created the complaint
          },
        },
      })
      .select("name email role complaints upVotedComplaints") // Selecting user info
      .lean(); // If you want a plain JavaScript object, not Mongoose document

    if (!user) throw new AppError("User not found", 404); // Move this here to check user existence first

    // To handle the result and get both types:
    const allComplaints = {
      normalComplaints: user.complaints
        .slice()
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ),

      upvotedComplaints: user.upVotedComplaints
        .map((upvote) => ({
          complaint: upvote.complaint,
          count: upvote.count,
          createdAt: upvote.createdAt,
        }))
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ),
    };

    return allComplaints;
  }

  async getWardsDeatails(wardNumber){
    const wards = await Ward.find({ ward_no: wardNumber });
    if(!wards) throw new AppError("Ward not found", 404);
    return wards;
  }
}

module.exports = new UserService();
