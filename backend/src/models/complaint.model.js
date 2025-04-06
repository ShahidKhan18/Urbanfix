const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    severity: { type: Number, default: 1 },

    status: {
      type: String,
      enum: ["open", "in_progress", "resolved"],
      default: "open",
    },

    wardNumber: {
      type: Number, 
      required: true,
    },

    images: [
      {
        url: { type: String, required: true }, // secure_url from Cloudinary
        public_id: { type: String, required: true }, // used for deleting/updating
        
      },
    ],

    upvotes: { type: Number, default: 0 },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports= mongoose.model("Complaint", complaintSchema);
