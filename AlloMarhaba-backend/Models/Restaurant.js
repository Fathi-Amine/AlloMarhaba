const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    name: {
        type: String,
        required: [true, "Please Provide a name"],
        minLength: 3,
        maxLength: 50,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    adress: {
        type: String,
        required: [true, "Please Provide a adress"],
        minLength: 3,
        maxLength: 50,
    },
    city: {
        type: String,
        required: [true, "Please Provide a city"],
        minLength: 3,
        maxLength: 50,
    },
    country: {
        type: String,
        required: [true, "Please Provide a country"],
    },
    phone: {
        type: String,
        required: [true, "Please Provide a phone"],
        minLength: 3,
        maxLength: 50,
    },
    image: {
        type: String,
        required: [true, "Please Provide a image"],
    },
    cuisineType: {
        // type: mongoose.Schema.Types.ObjectId,
        type: String,
        required: [true, "Please Provide a cuisine Type"],
        ref: "CuisineType",
    },
    latitude: {
        type: String,
        required: [true, "Please Provide a latitude"],
    },
    longitude: {
        type: String,
        required: [true, "Please Provide a longitude"],
    },
});

module.exports = mongoose.model("Restaurant", RestaurantSchema);
