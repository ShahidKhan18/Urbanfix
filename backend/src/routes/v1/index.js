const {Router} =require("express")

const router=Router();


router.use("/users",require("./user.routes"))





module.exports=router