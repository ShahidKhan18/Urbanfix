const {Router} =require("express")

const router=Router();


const { InfoController } = require("../../controllers");
router.get("/info", InfoController.info);




module.exports=router