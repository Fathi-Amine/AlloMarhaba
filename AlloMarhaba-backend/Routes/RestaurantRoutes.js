const express = require('express')
const router = express.Router();

const restaurantController = require('../Controllers/RestaurantController')
const TypeCuisineController = require('../Controllers/TypeCuisineController')

router.get("/restaurants", restaurantController.displayRestarants)
router.get('/restaurants/search/:key', restaurantController.searchRestaurantByName);
router.get('/restaurants/search/cuisine-type/:cuisineTypeId', restaurantController.searchByCuisineType);
router.get('/restaurants/cuisine-type', TypeCuisineController.displayCuisineType)

module.exports = router