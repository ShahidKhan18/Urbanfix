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
  getNearbyComplaints = catchAsyncError(async (req, res) => {
    // console.log("Creating complaint ", req.body);
    let { longitude, latitude } = req.query;
    const response = await ComplaintService.getNearbyComplaints(
      latitude,
      longitude
    );
    SuccessResponse.data = response;
    SuccessResponse.message = "Nearby complaints fetched successfully";
    res.status(StatusCodes.OK).json(SuccessResponse);
  });

  getComplaintsByWardNumber = catchAsyncError(async (req, res) => {
    // console.log("Creating complaint ", req.body);
    let { wardNumber } = req.query;
    const response = await ComplaintService.getComplaintsByWardNumber(
      wardNumber
    );
    SuccessResponse.data = response;
    SuccessResponse.message = "Complaints fetched successfully by ward number";
    res.status(StatusCodes.OK).json(SuccessResponse);
  });

  updateComplaintStatus = catchAsyncError(async (req, res) => {
    const { complaintId } = req.params;
    const { status } = req.body;
    const response = await ComplaintService.updateComplaintStatus(
      complaintId,
      status
    );
    SuccessResponse.data = response;
    SuccessResponse.message = "Complaint status updated successfully";
    res.status(StatusCodes.OK).json(SuccessResponse);
  })
}

module.exports = new ComplaintController();
