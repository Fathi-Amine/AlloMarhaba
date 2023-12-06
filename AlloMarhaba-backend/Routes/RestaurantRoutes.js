const express = require('express')
const router = express.Router();

const restaurantController = require('../Controllers/RestaurantController')
const TypeCuisineController = require('../Controllers/TypeCuisineController')
const OrderController = require('../Controllers/client/OrderController')
const NotificationController = require('../Controllers/NotificationController')
const authMiddleware = require('../Middlewares/authMiddleware')

router.get("/restaurants", restaurantController.displayRestaurants)
router.get('/restaurants/search/:key', restaurantController.searchRestaurantByName);
router.get('/restaurants/search/cuisine-type/:cuisineTypeId', restaurantController.searchByCuisineType);
router.get('/restaurants/search/searchByPlace/:place', restaurantController.searchByPlace);
router.get('/restaurants/cuisine-type', TypeCuisineController.displayCuisineType)
router.post('/assign-order-to-livreur', OrderController.assignOrderToLivreur)
// router.get('/notifications/:email', NotificationController.getAllNotificationsForUser);

module.exports = router