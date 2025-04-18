const { Complaint, Upvotes } = require("../models");

module.exports = {
  UserValidation: require("./user.validation"),
  ComplaintValidation: require("./complaint.validation"),
  UpvotesValidation: require("./upvote.validation"),
};
