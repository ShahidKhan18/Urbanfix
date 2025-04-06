const jwt = require("jsonwebtoken");
const { AppError } = require("../utils");
const {User} = require("../models/");

const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return next(new AppError("Unauthorized", 401));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded,"Decoded");
    req.user = await User.findById(decoded.id).select("-password");
    // console.log(req.user,"User")
    if (req.user===null || req.user===undefined) return next(new AppError("User not found", 401));
    next();
  } catch (error) {
    console.log(error,"Error")
    next(new AppError("Invalid or expired token", 403));
  }
};

module.exports = { authenticateUser };
