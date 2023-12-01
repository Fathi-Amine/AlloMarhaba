const express = require("express");
const router = express.Router();

const {
    createMenuItem,
    getMenuItems,
    getMenuItem,
    updateMenuItem,
    updateMenuImage,
    deleteMenuItem,
} = require("../Controllers/manager/MenuController");
const validationMenu = require("../Utils/validationMenu");

// const{ createMenuItem} = require('../Controllers/MenuController');
const RestaurantController = require("../Controllers/RestaurantController");
const authMiddleware = require("../Middlewares/authMiddleware");
const {getOrders , changeStatusOrders } = require('../Controllers/client/OrderController')

    

router.post('/addMenu', validationMenu,createMenuItem)
router.get('/showMenus',authMiddleware,getMenuItems)
router.post('/showMenu',getMenuItem)

router.post('/updateMenu',updateMenuItem)
router.post('/deleteMenu',deleteMenuItem)



router.get('/getOreders' , authMiddleware, getOrders)
router.post('/changeStatus' , authMiddleware, changeStatusOrders)


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
