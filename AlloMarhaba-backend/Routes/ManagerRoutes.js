const RestaurantController = require("../Controllers/RestaurantController");
const authMiddleware = require("../Middlewares/authMiddleware");
const router = require("express").Router();

// router.post("/add", RestaurantController.createRestaurant);
router.get(
    "/checkRestaurant",
    authMiddleware,
    RestaurantController.getRestaurantByUserId
);
router.post("/add", authMiddleware, RestaurantController.createRestaurant);


module.exports = router;
