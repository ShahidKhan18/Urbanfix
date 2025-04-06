const BaseController = require("./base.controller");
const { ComplaintService } = require("../services");
const catchAsyncError = require("../middlewares/catchAsyncError.middleware");
const { StatusCodes } = require("http-status-codes");
const { SuccessResponse } = require("../utils/common");

class ComplaintController extends BaseController {
  constructor() {
    super(ComplaintService);
  }

  createComplaint = catchAsyncError(async (req, res) => {
    // console.log("Creating complaint ", req.body);
    const response = await ComplaintService.createComplaint(req.body, req);
    SuccessResponse.data = response;
    SuccessResponse.message = "Complaint created successfully";
    res.status(StatusCodes.CREATED).json(SuccessResponse);
  });
}

module.exports = new ComplaintController();
