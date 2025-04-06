const {Router} =require("express");


const router=Router();


router.use("/users",require("./user.routes"))
router.use("/complaints",require("./complaint.routes"))

module.exports=router