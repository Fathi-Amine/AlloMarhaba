const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    restaurant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
    },
    menus: [
        {
            menu_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Menu",
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
    total_price: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        // enum: ['pending', 'accepted', 'rejected'],
        default: "pending",
    },
    checkoutDetails: [
        {
            name: {
                type: String,
                required: true,
            },
            phone: {
                type: String,
                required: true,
            },
            address: {
                type: String,
                required: true,
            },
            postalCode: {
                type: String,
                required: true,
            },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    arrive_longtiude: {
        type: Number,
        required: true,
    },
    arrive_latitude: {
        type: Number,
        required: true,
    },
});



module.exports = mongoose.model("Order", orderSchema);
