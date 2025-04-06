const express = require("express");

const { ServerConfig } = require("./config");
const apiRoutes =require("./routes");
const { ErrorMiddleware } = require("./middlewares");
const { DBConnection } = require("./config");
const app = express();
const cloudinary = require("cloudinary");
const cors = require("cors")

DBConnection();
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use("/api",apiRoutes)

//Clodinary Configuration
cloudinary.v2.config({
  cloud_name: ServerConfig.CLOUDINARY.cloud_name,
  api_key: ServerConfig.CLOUDINARY.api_key,
  api_secret: ServerConfig.CLOUDINARY.api_secret,
});


app.use(ErrorMiddleware);
app.listen(ServerConfig.PORT, (_req, _res) =>
  console.log(`Server Start Successfully on PORT ${ServerConfig.PORT}`)
);
