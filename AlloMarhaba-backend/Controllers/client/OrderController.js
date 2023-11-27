const RestaurantModel = require("../../Models/Restaurant");
const OrderModel = require("../../Models/Order");

async function createOrder(req, res) {
    try {
        // Select restaurant by name and select only the id
        const restaurant = await RestaurantModel.findOne({
            name: req.body.restaurantName,
        });

        if (!restaurant) {
            // Handle the case where the restaurant is not found
            return res.status(404).json({ error: "Restaurant not found" });
        }

        // Create order
        const savedOrder = await OrderModel.create({
            user_id: req.user.userId,
            restaurant_id: restaurant._id,
            menus: req.body.menus,
            total_price: req.body.totalPrice,
            checkoutDetails: req.body.checkoutDetails,
            arrive_longtiude: req.body.longitude,
            arrive_latitude: req.body.latitude,
        });

        const io = req.app.get("socketio");

        // Emit the 'newOrder' event to the restaurant room
        // io.emit("newOrder", {
        //     order: savedOrder,
        // });
        io.to(`restaurant_${restaurant._id}`).emit("newOrder", {
            order: savedOrder,
        });

        return res
            .status(200)
            .json({ success: true, message: "Order created successfully" });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: err });
    }
}

module.exports = {
    createOrder,
};
