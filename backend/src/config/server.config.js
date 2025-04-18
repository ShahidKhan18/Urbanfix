const dotenv=require('dotenv')

dotenv.config()

module.exports = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  CLOUDINARY: {
    cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
    api_key: process.env.CLOUDINARY_CLIENT_API,
    api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
  },
  GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
  JWT_SECRET: process.env.JWT_SECRET,
};