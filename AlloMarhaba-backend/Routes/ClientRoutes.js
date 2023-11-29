const express = require("express");
const router = express.Router();
const orderController = require("../Controllers/client/OrderController");
const authMiddleware = require("../Middlewares/authMiddleware");

// post request to create a new order

router.post("/orders", authMiddleware, orderController.createOrder);

module.exports = router;
