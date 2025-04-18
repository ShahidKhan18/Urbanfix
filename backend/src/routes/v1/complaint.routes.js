const express=require("express");
const {ComplaintController, UpvoteController}=require("../../controllers");
const { AuthMiddleware, SingleUpload ,} = require("../../middlewares");
const router=express.Router();

router.post("/create",AuthMiddleware.authenticateUser,SingleUpload ,ComplaintController.createComplaint);
router.get("/all", ComplaintController.findAll);
router.get("/getNearByComplaints", ComplaintController.getNearbyComplaints);
router.get("/getComplaintsByWardNumber", ComplaintController.getComplaintsByWardNumber);
router.get(
  "/upVoteComplainet",
  AuthMiddleware.authenticateUser,
  UpvoteController.upvote
);

module.exports=router;