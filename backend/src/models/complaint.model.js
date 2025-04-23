const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    severity: { type: Number, default: 1 },

    status: {
      type: String,
      enum: ["open", "in_progress", "resolved","rejected"],
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

    upvotes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Upvote",
      },
    ],

    // ⬇️ Location (lat, lng) stored in GeoJSON format
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
complaintSchema.index({ location: "2dsphere" });
module.exports= mongoose.model("Complaint", complaintSchema);
