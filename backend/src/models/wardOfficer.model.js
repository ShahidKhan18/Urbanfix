const mongoose = require("mongoose");

const wardOfficerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    wardNumber: {
      type: Number,
      required: [true, "Ward number is required"],
      min: 1,
    },
  },
  {
    timestamps: true,
  }
);

const WardOfficer = mongoose.model("wardofficers", wardOfficerSchema);

module.exports = WardOfficer;
