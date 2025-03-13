const {StatusCodes} =require("http-status-codes"); 
const { LoggerConfig } = require("../config");
const { level } = require("winston");

const info=(req,res)=>{
    LoggerConfig.logger.log({
        level:"info",
        message:"This is Info Logger",
        error:{
            msg:"This is Error Msg"
        }
    })
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "API is Live",
      error: {},
      data: {},
    });
}

module.exports={
    info,
}