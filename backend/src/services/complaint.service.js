const BaseService = require("./base.service");
const { Complaint, User, Upvotes } = require("../models");

const { AppError, getDataUri,LocationUtils } = require("../utils");
const { ComplaintValidation } = require("../validations");
const { StatusCodes } = require("http-status-codes");
const cloudinary = require("cloudinary");

class ComplainetService extends BaseService {
  constructor() {
    super(Complaint, ComplaintValidation.complaintSchema); // Pass model & validation schema
  }

  // ✅ Create a complaint
  async createComplaint(data, req) {
    // Validate and coerce wardNumber to a number
    // this.validateData({ ...data, wardNumber: +data.wardNumber });

    const file = req.file;
    if (!file) {
      throw new AppError("Image is required", StatusCodes.BAD_REQUEST);
    }

    const { _id } = req.user;

    const user = await User.findById(_id);
    if (!user) {
      throw new AppError("User not found", StatusCodes.NOT_FOUND);
    }

    let { title, description, latitude, longitude } = data;

    if (!latitude || !longitude) {
      console.log(
        "🔍 No coordinates provided. Fetching from Google Geolocation API..."
      );
      const location = await LocationUtils.getGoogleGeolocation();
      if (location) {
        latitude = location.lat;
        longitude = location.lng;
      } else {
        throw new AppError(
          "❌ Unable to fetch live location. Please provide latitude and longitude.",
          StatusCodes.BAD_REQUEST
        );
      }
      
    }

    const fileUri = getDataUri(file);
    const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

    const wardNumber = await LocationUtils.getWardByCoordinates(
      latitude,
      longitude
    );
    

    // console.log("Ward Number:", wardNumber);

    const complaintData = {
      title,
      description,
      wardNumber: wardNumber.ward_no,
      location: {
        type: "Point",
        coordinates: [parseFloat(longitude), parseFloat(latitude)], // longitude first
      },
      user: _id,
      images: [
        {
          url: myCloud.secure_url,
          public_id: myCloud.public_id,
        },
      ],
    };

    const complaint = await this.model.create(complaintData);
    await Upvotes.create({complaint: complaint._id, user: _id})
    user.complaints.push(complaint._id);
    await user.save();

    return complaint;
  }

  // ✅ Get complaints within 400m of given location
  async getNearbyComplaints(latitude, longitude, radiusInMeters = 400) {
    if (!latitude || !longitude) {
      throw new AppError("Latitude and Longitude are required", StatusCodes.BAD_REQUEST);
    }

    const complaints = await this.model
      .find({
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [parseFloat(longitude), parseFloat(latitude)], // [lng, lat]
            },
            $maxDistance: radiusInMeters,
          },
        },
      })
      .populate("user", "name email");

    return complaints;
  }

  // ✅ Get complaints by Ward Number
  async getComplaintsByWardNumber(wardNumber) {
    if (!wardNumber) {
      throw new AppError("wardNumber is required", 400);
    }

    const complaints = await this.model
      .find({
        wardNumber: +wardNumber,
      })
      .populate("user", "name email");

   const wardDetails= await LocationUtils.getWardByWardNumber(wardNumber);
    
    return {complaints, wardDetails};
  }
}

module.exports = new ComplainetService();
