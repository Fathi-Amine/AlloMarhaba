const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cuisineTypeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
}, { timestamps: true });

module.exports = mongoose.model("CuisineType", cuisineTypeSchema);


