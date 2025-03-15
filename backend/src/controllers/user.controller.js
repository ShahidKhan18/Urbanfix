const BaseController = require("./base.controller");
const { UserServie } = require("../services");
const catchAsyncError = require("../middlewares/catchAsyncError.middleware");
const { StatusCodes } = require("http-status-codes");

class UserController extends BaseController {
  constructor() {
    super(UserServie);
  }

  login = catchAsyncError(async (req, res) => {
    const response = await this.service.login(req.body);
    res.status(StatusCodes.OK).json(response);
  });

  refreshAccessToken = catchAsyncError(async (req, res) => {
    const { refreshToken } = req.body;
    const response = await this.service.refreshAccessToken(refreshToken);
    res.status(StatusCodes.OK).json(response);
  });
}

module.exports = new UserController();
