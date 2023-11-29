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

const changeStatusOrders = async(req , res)=>{
    try {
        const {status} = req.body
        const user_id = req.user.userId
        const getRestaurant = await RestaurantModel.findOne({
            user: user_id,
        }).select('_id');
        const restaurantId = getRestaurant._id.toString(); // Convert ObjectId t
        if (restaurantId) {
            const orders = await OrderModel.findOneAndUpdate( {restaurant_id : restaurantId},{status})
            if (orders) {
                socket.emit('sendNotification', {
                    message: `Command ${commandName} is ready`,
                });
                res.status(200).json({
                    message : "status updated succusefly"
                }) 
            }
            else{
                res.status(200).json({
               message : "status is not changed"
               })
            }
        }
    } catch (error) {
        console.log(error.message);

    }
}

module.exports = {
    createOrder,
    changeStatusOrders
};
