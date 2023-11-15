const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming there is a User model
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    image: {
        type: String, // Assuming you store the image URL
        required: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    cuisine_type: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);
