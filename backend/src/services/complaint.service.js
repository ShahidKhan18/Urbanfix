const BaseService = require("./base.service");
const { Complaint, User } = require("../models");

const { AppError,getDataUri } = require("../utils");
const { ComplaintValidation } = require("../validations");
const { StatusCodes } = require("http-status-codes");
const cloudinary = require("cloudinary");

class ComplainetService extends BaseService {
  constructor() {
    super(Complaint, ComplaintValidation.complaintSchema); // Pass model & validation schema
  }
  async createComplaint(data, req) {
    // console.log(data,"Data from create complaint service")
    this.validateData({...data,wardNumber:+data.wardNumber});
    const file=req.file
    if (!file)
      throw new AppError("Image is required", StatusCodes.BAD_REQUEST);
    const { _id } = req.user;

    const user =await User.findById(_id);
    if (!user) throw new AppError("User not found", StatusCodes.NOT_FOUND);
    const { title, description, wardNumber } = data;

    const fileUri = getDataUri(file);
    const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

    // console.log(myCloud,"My Cloud") 

    const complaintData = {
      title,
      description,
      wardNumber,
      user: _id,
      images: [
        {
          url: myCloud.secure_url,
          public_id: myCloud.public_id,
        },
      ],
    };

    const complaint =await this.model.create(complaintData);
    user.complaints.push(complaint._id);
    await user.save();
    
    return complaint;
  }
}

module.exports = new ComplainetService();
