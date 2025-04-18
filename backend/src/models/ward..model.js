const mongoose = require("mongoose");
// Define Mongoose Schema for Ward
const wardSchema = new mongoose.Schema({
  ward_no: { type: Number, required: true },
  no_of_households: { type: Number, required: true },
  population: { type: Number, required: true },
  sanitary_inspector: { type: String, required: true },
  mobile_no: { type: String, required: true },
  geometry: {
    type: { type: String, enum: ["Polygon"], required: true },
    coordinates: {
      type: [[[Number]]],
      required: true,
      //   select: false,
    },
  },
});

// Create Mongoose Model
const Ward=mongoose.model("Wards", wardSchema);
module.exports=Ward;
