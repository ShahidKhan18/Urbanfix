const axios = require("axios");
const {ServerConfig} =require("../config")

const {Ward} = require("../models"); // Adjust path as needed
const AppError = require("./errors/app.error");
const { StatusCodes } = require("http-status-codes");


async function getGoogleGeolocation() {
  try {
    const response = await axios.post(
      `https://www.googleapis.com/geolocation/v1/geolocate?key=${ServerConfig.GOOGLE_MAPS_API_KEY}`
    );
    return response.data.location; // { lat, lng }
  } catch (error) {
    console.error("❌ Google Geolocation Error:", error.message);
    return null;
  }
}




/**
 * Find the ward that contains the given latitude and longitude.
 * @param {number} latitude - Latitude of the location
 * @param {number} longitude - Longitude of the location
 * @returns {Promise<Object>} - Ward document or throws error
 */
const getWardByCoordinates = async (latitude, longitude) => {
  if (!latitude || !longitude) {
    throw new AppError(
      "Latitude and Longitude are required",
      StatusCodes.BAD_REQUEST
    );
  }

  const point = {
    type: "Point",
    coordinates: [parseFloat(longitude), parseFloat(latitude)], // [lng, lat]
  };

  const ward = await Ward.findOne({
    geometry: {
      $geoIntersects: {
        $geometry: point,
      },
    },
  });

  if (!ward) {
    throw new AppError("No ward found for this location", StatusCodes.NOT_FOUND);
  }

  return ward;
};


const getWardByWardNumber = async (wardNumber) => {
    if (!wardNumber) {
        throw new AppError("Ward number is required", StatusCodes.BAD_REQUEST);
    }
    
    const ward = await Ward.findOne({ ward_no: wardNumber });
    
    if (!ward) {
        throw new AppError("No ward found for this ward number", StatusCodes.NOT_FOUND);
    }
    
    return ward;
}




module.exports = {
  getGoogleGeolocation,
  getWardByCoordinates,
  getWardByWardNumber,
};