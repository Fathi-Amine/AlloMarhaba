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

const getOrders = async (req , res)=>{

    
  
     try {

        const user_id = req.user.userId
        const getRestaurant = await RestaurantModel.findOne({
            user: user_id,
        }).select('_id');
        if (getRestaurant) {
            const restaurantId = getRestaurant._id.toString(); // Convert ObjectId to string
            console.log('for restau id',restaurantId);
        const orders = await OrderModel.find({
            restaurant_id : restaurantId
        }).populate('user_id', 'username')
        
        if (orders) {
            res.status(201).json({
                message : 'voila les orders',
                data : orders
            })            
        }else{
            res.status(204).json({
                message : "vous avez pas des command pour votre restaurant"
            })
        }

        }else{

            res.json({
                error : "pas de Orders pour vous"
            })
        }
       
     } catch(error) { 
        return res.status(400).json({ error: error.message });
    
     } 




}
const getCLientOrders = async(req , res)=>{

    try {
        const client_id = req.user.userId
        const clientOrder = await OrderModel.find({
            user_id: client_id
        }).populate('restaurant_id', 'name').populate({
            path: 'menus._id',
            model: 'Menu',
          });
         console.log(clientOrder);

        if (Object.keys(clientOrder).length > 0)  {
            res.json({

                message : "voici votre command",
                data : clientOrder
            })
        }else {

            res.json({
                message : "pas de command pour vous "
            })
        }

    
        
    } catch (error) {
        console.log(error.message)
        
    }


}
const changeStatusOrders = async(req , res)=>{

    try {
        const {id , status} = req.body;
        console.log(status);

        const orders = await OrderModel.findOneAndUpdate( {_id : id},{status},{ new: true });
        const io = req.app.get("socketio"); 
        if (orders) {
            io.emit('orderStatusChanged', { ordersData : orders });
            
            res.status(200).json({
                message : "status updated succusefly"
            }) 
        
        }
        else{
            res.status(200).json({
            message : "status is not changed"
            })
        }
            
        
    } catch (error) {
        console.log(error.message);
        
    }




}

module.exports = {
    createOrder,
    getOrders,
    changeStatusOrders,
    getCLientOrders
};
