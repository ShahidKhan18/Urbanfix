const mongoose = require("mongoose");

const upvoteSchema = new mongoose.Schema(
  {
    complaint: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Complaint",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    count: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

upvoteSchema.index({ user: 1, complaint: 1 }, { unique: true });

module.exports = mongoose.model("Upvote", upvoteSchema);
