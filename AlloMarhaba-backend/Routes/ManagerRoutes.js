const express = require('express')
const uploadfile = require('../Utils/multer');
const router = express.Router();
const{ createMenuItem} = require('../Controllers/MenuController');
const RestaurantController = require("../Controllers/manager/RestaurantController");
const authMiddleware = require("../Middlewares/authMiddleware");
    

router.post('/addMenu',uploadfile,createMenuItem)

// router.post("/add", RestaurantController.createRestaurant);
router.get(
    "/checkRestaurant",
    authMiddleware,
    RestaurantController.getRestaurantByUserId
);
router.post(
    "/restaurant/add",
    authMiddleware,
    RestaurantController.createRestaurant
);


module.exports = router;

