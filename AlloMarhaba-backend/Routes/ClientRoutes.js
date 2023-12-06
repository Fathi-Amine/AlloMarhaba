const express = require("express");
const router = express.Router();
const orderController = require("../Controllers/client/OrderController");
const authMiddleware = require("../Middlewares/authMiddleware");
const { getCLientOrders } = require("../Controllers/client/OrderController");
const menuController = require("../Controllers/manager/MenuController");

// post request to create a new order

router.post("/orders", authMiddleware, orderController.createOrder);
router.get("/getClientOrders", authMiddleware, getCLientOrders);

// get menus of a restaurant
router.get("/products/:restaurantName", menuController.getRestaurantMenu);

module.exports = router;
