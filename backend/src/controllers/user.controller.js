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
    const response = await this.service.login(req.body,res);
    SuccessResponse.data = response;
    SuccessResponse.message = "Login successful";
    res.status(StatusCodes.OK).json(SuccessResponse);
  });

  refreshAccessToken = catchAsyncError(async (req, res) => {
    const { refreshToken } = req.body;
    const response = await this.service.refreshAccessToken(refreshToken);
    SuccessResponse.data = response;
    SuccessResponse.message = "Access token refreshed successfully";
    res.status(StatusCodes.OK).json(SuccessResponse);
  });
}

module.exports = new UserController();
