const { StatusCodes } = require("http-status-codes");
const catchAsyncError = require("../middlewares/catchAsyncError.middleware");
const {SuccessResponse} = require("../utils/common");

class BaseController {
  constructor(service) {
    this.service = service;
  }

  create = catchAsyncError(async (req, res) => {
    const response = await this.service.create(req.body);
    SuccessResponse.data = response;
    SuccessResponse.message = `Successfully created ${this.service.model.modelName}`;
    res.status(StatusCodes.CREATED).json(SuccessResponse);
  });

  findById = catchAsyncError(async (req, res) => {
    const response = await this.service.findById(req.user.id || req.params.id);
    SuccessResponse.data = response;
    SuccessResponse.message = `Successfully fetched ${this.service.model.modelName}`;
    res.status(StatusCodes.OK).json(SuccessResponse);
  });

  findAll = catchAsyncError(async (req, res) => {
    const response = await this.service.findAll();
    SuccessResponse.data = response;
    SuccessResponse.message = `Successfully fetched all ${this.service.model.modelName}s`;
    res.status(StatusCodes.OK).json(SuccessResponse);
  });

  update = catchAsyncError(async (req, res) => {
    const response = await this.service.update(req.params.id, req.body);
    SuccessResponse.data = response;
    SuccessResponse.message = `Successfully updated ${this.service.model.modelName}`;
    res.status(StatusCodes.OK).json(SuccessResponse);
  });

  delete = catchAsyncError(async (req, res) => {
    await this.service.delete(req.params.id);
    SuccessResponse.message = `Successfully deleted ${this.service.model.modelName}`;
    res.status(StatusCodes.NO_CONTENT).json(SuccessResponse);
  });
}

module.exports = BaseController;
