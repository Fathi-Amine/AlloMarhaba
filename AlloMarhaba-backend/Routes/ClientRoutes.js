const express = require("express");
const router = express.Router();
const orderController = require("../Controllers/client/OrderController");
const authMiddleware = require("../Middlewares/authMiddleware");
const {getCLientOrders} = require('../Controllers/client/OrderController')

// post request to create a new order

router.post("/orders", authMiddleware, orderController.createOrder);
router.get("/getClientOrders", authMiddleware,getCLientOrders );



module.exports = router;
