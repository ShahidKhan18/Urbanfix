const upvoteService = require("../services/upvote.service");
const {catchAsyncError} = require("../middlewares/");
const { SuccessResponse } = require("../utils/common");
const { StatusCodes } = require("http-status-codes");

class UpvoteController {
  upvote = catchAsyncError(async (req, res) => {
    const userId = req.user._id;
    const { complaintId } = req.query;

    const response = await upvoteService.upvoteComplaint(userId, complaintId);
    SuccessResponse.data = response;
        SuccessResponse.message = "Upvote added successfully";
        res.status(StatusCodes.OK).json(SuccessResponse);
  });

  removeUpvote = catchAsyncError(async (req, res) => {
    const userId = req.user._id;
    const { complaintId } = req.params;

    const result = await upvoteService.removeUpvote(userId, complaintId);
    return res.status(200).json(new SuccessResponse(result.message));
  });
}

module.exports = new UpvoteController();
