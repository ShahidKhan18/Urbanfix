const express = require("express");

const { ServerConfig } = require("./config");
const apiRoutes = require("./routes");
const { ErrorMiddleware } = require("./middlewares");
const { DBConnection } = require("./config");
const app = express();
const cloudinary = require("cloudinary");
const cors = require("cors");

DBConnection();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
  "http://localhost:8080",
  "http://192.168.29.183:8080",
  "http://localhost:3000", // Add this if you have any direct API testing
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, Postman, or curl requests)
      if (!origin) return callback(null, true);

      // Check if the origin is in the allowed list or contains localhost
      if (
        allowedOrigins.includes(origin) ||
        origin.includes("localhost") ||
        origin.includes("127.0.0.1")
      ) {
        return callback(null, true);
      }

      const msg = `CORS error: The origin ${origin} is not allowed`;
      console.log(msg);
      return callback(new Error(msg), false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    exposedHeaders: ["Set-Cookie"], // If you need to read cookies in the frontend
  })
);
app.use("/api", apiRoutes);

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
