const express = require("express");

const { ServerConfig } = require("./config");
const apiRoutes =require("./routes")

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api",apiRoutes)



app.listen(ServerConfig.PORT, (_req, _res) =>
  console.log(`Server Start Successfully on PORT ${ServerConfig.PORT}`)
);
