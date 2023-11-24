const RestaurantModel = require("../../Models/Restaurant");
const OrderModel = require("../../Models/Order");

async function createOrder(req, res) {
    try {
        // select restaurant by name and select only the id
        const restaurant = await RestaurantModel.findOne({
            name: req.body.restaurantName,
        });

        console.log(req.body);
        console.log(req.user.userId);

        // create order
        const savedOrder = await OrderModel.create({
            user_id: req.user.userId,
            restaurant_id: restaurant._id,
            menus: req.body.menus,
            total_price: req.body.totalPrice,
            checkoutDetails: req.body.checkoutDetails,
            arrive_longtiude: req.body.longitude,
            arrive_latitude: req.body.latitude,
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
