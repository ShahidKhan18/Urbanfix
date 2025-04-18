const upvoteService = require("../services/upvote.service");
const catchAsyncError = require("../middlewares/catchAsyncError");
const { SuccessResponse } = require("../utils/SuccessResponse");

class UpvoteController {
  upvote = catchAsyncError(async (req, res) => {
    const userId = req.user._id;
    const { complaintId } = req.body;

    const result = await upvoteService.upvoteComplaint(userId, complaintId);
    return res.status(200).json(new SuccessResponse("Upvote toggled", result));
  });

  removeUpvote = catchAsyncError(async (req, res) => {
    const userId = req.user._id;
    const { complaintId } = req.params;

    const result = await upvoteService.removeUpvote(userId, complaintId);
    return res.status(200).json(new SuccessResponse(result.message));
  });
}

module.exports = new UpvoteController();
