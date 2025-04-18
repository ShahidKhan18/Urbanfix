const BaseService = require("./base.service");
const Upvote = require("../models/upvote.model");
const Complaint = require("../models/complaint.model");
const User = require("../models/user.model");
const AppError = require("../utils/AppError");

class UpvoteService extends BaseService {
  constructor() {
    super(Upvote);
  }

  async upvoteComplaint(userId, complaintId) {
    let upvote = await Upvote.findOne({ complaint: complaintId });

    if (!upvote) {
      upvote = await Upvote.create({
        user: userId,
        complaint: complaintId,
        users: [userId],
        count: 1,
      });
    } else {
      const hasUpvoted = upvote.users.some(
        (id) => id.toString() === userId.toString()
      );

      if (hasUpvoted) {
        // Remove user from upvotes
        upvote.users = upvote.users.filter(
          (id) => id.toString() !== userId.toString()
        );
        upvote.count = Math.max(0, upvote.count - 1);
        await upvote.save();

        // Remove upvote ID from Complaint if needed
        if (upvote.count === 0) {
          await Complaint.findByIdAndUpdate(complaintId, {
            $pull: { upvotes: upvote._id },
          });
          await Upvote.findByIdAndDelete(upvote._id);
        }

        // Also remove from user (optional: if stored)
        await User.findByIdAndUpdate(userId, {
          $pull: { upvotes: upvote._id },
        });

        return { removed: true, message: "Upvote removed" };
      }

      // If not already upvoted, then upvote
      upvote.count += 1;
      upvote.users.push(userId);
      await upvote.save();
    }

    await Complaint.findByIdAndUpdate(complaintId, {
      $addToSet: { upvotes: upvote._id },
    });

    await User.findByIdAndUpdate(userId, {
      $addToSet: { upvotes: upvote._id },
    });

    return upvote;
  }

  async removeUpvote(userId, complaintId) {
    const upvote = await Upvote.findOne({ complaint: complaintId });
    if (!upvote) throw new AppError("Upvote not found", 404);

    if (!upvote.users.includes(userId)) {
      throw new AppError("You haven't upvoted this complaint", 400);
    }

    upvote.users = upvote.users.filter(
      (id) => id.toString() !== userId.toString()
    );
    upvote.count = Math.max(0, upvote.count - 1);
    await upvote.save();

    if (upvote.count === 0) {
      await Complaint.findByIdAndUpdate(complaintId, {
        $pull: { upvotes: upvote._id },
      });
      await Upvote.findByIdAndDelete(upvote._id);
    }

    await User.findByIdAndUpdate(userId, {
      $pull: { upvotes: upvote._id },
    });

    return { message: "Upvote removed" };
  }
}

module.exports = new UpvoteService();
