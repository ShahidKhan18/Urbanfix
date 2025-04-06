const express=require("express");
const {ComplaintController}=require("../../controllers");
const { AuthMiddleware, SingleUpload ,} = require("../../middlewares");
const router=express.Router();

router.post("/create",AuthMiddleware.authenticateUser,SingleUpload ,ComplaintController.createComplaint);
router.get("/all", ComplaintController.findAll);

module.exports=router;