const express = require('express')
const router = express.Router();

const restaurantController = require('../Controllers/RestaurantController')
const TypeCuisineController = require('../Controllers/TypeCuisineController')

router.get("/restaurants", restaurantController.displayRestaurants)
router.get('/restaurants/search/:key', restaurantController.searchRestaurantByName);
router.get('/restaurants/search/cuisine-type/:cuisineTypeId', restaurantController.searchByCuisineType);
router.get('/restaurants/search/searchByPlace/:place', restaurantController.searchByPlace);
router.get('/restaurants/cuisine-type', TypeCuisineController.displayCuisineType)

module.exports = router