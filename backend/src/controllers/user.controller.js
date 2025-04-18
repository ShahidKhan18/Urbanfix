const BaseController = require("./base.controller");
const { UserServie } = require("../services");
const catchAsyncError = require("../middlewares/catchAsyncError.middleware");
const { StatusCodes } = require("http-status-codes");
const { SuccessResponse } = require("../utils/common");

class UserController extends BaseController {
  constructor() {
    super(UserServie);
  }

  login = catchAsyncError(async (req, res) => {
    const response = await this.service.login(req.body, res);
    SuccessResponse.data = response;
    SuccessResponse.message = "Login successful";
    res.status(StatusCodes.OK).json(SuccessResponse);
  });
  getUserComplainets = catchAsyncError(async (req, res) => {
    const userId = req.user._id;
    const response = await this.service.getUserComplaints(userId);
    SuccessResponse.data = response;
    SuccessResponse.message = "User complaints fetched successfully";
    res.status(StatusCodes.OK).json(SuccessResponse);
  });

  refreshAccessToken = catchAsyncError(async (req, res) => {
    const { refreshToken } = req.body;
    const response = await this.service.refreshAccessToken(refreshToken);
    SuccessResponse.data = response;
    SuccessResponse.message = "Access token refreshed successfully";
    res.status(StatusCodes.OK).json(SuccessResponse);
  });

  logout= catchAsyncError(async (req, res) => {
    const userId = req.user._id;
    await this.service.logout(userId);
    res.clearCookie("refreshToken", { path: "/" });
    SuccessResponse.message = "Logout successful";
    res.status(StatusCodes.OK).json(SuccessResponse);
  });
}

module.exports = new UserController();
