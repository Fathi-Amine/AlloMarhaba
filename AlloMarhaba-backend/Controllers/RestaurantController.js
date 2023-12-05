const validateRestaurant = require("../validator/restaurantValidator");
const Restaurant = require("../Models/Restaurant");
const CuisineType = require("../Models/CuisineType");
const User = require("../Models/Users");


async function createRestaurant(req, res) {
    const { error } = validateRestaurant.validateCreateRestaurant(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    // console.log(req.body);

    // return res.status(200).json({ data: req.body });

    try {
        console.log("inside try");
        const savedRestaurant = await Restaurant.create({
            user: req.user.userId,
            name: req.body.name,
            adress: req.body.adress,
            city: req.body.city,
            country: req.body.country,
            phone: req.body.phone,
            image: req.body.image,
            cuisineType: req.body.cuisineType,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
        });
        return res.status(201).json({
            success: "Restaurant created successfully",
        });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: err });
    }
}

async function getRestaurantByUserId(req, res) {
    // console.log("cdcdccd");
    let id = req.user.userId;
    // let id = "6555d5741c8149f78acd28c8";
    try {
        const restaurant = await Restaurant.find({
            user: id,
        });
        console.log(restaurant[0]);
        if (restaurant[0] == null) {
            console.log("No restaurant found");
            return res.json({
                status: false,
                data: "No restaurant found",
            });
        }
        console.log("Restaurant found nnnnn");
        return res.json({
            status: true,
            data: restaurant[0],
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: "Server Error",
        });
    }
}

const searchRestaurantByName = async (req, res) => {
    try {

        const restaurants = await Restaurant.find({
            $or: [
                { name: { $regex: req.params.key, $options: 'i' } },
            ],
        });

        if (restaurants.length === 0) {
            return res.status(404).json({ message: 'No restaurants found.' });
        }

        res.status(200).json({ restaurants });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching restaurants.', error: error.message });
    }
};

const searchByCuisineType = async (req, res) => {
    try {
        const cuisineTypeId = req.params.cuisineTypeId;
        // console.log(cuisineTypeId) ;
        const restaurants = await Restaurant.find({ cuisineType: cuisineTypeId });
        // console.log(restaurants);

        if (restaurants.length === 0) {
            return res.status(404).json({ message: 'No restaurants found for this category.' });
        }
        
        res.status(200).json({ restaurants });
    } catch (error) {
        // console.error(error)
        res.status(500).json({ message: 'Error fetching restaurants by category.', error: error.message });
    }
};

const searchByPlace = async (req, res)=>{
    const city = req.params.place
    const restaurants = await Restaurant.find({city:city}).select('name latitude longitude image cuisineType').populate('cuisineType')
    console.log(restaurants)
    res.json({restaurants})
}

const displayRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.json({ restaurants });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching restaurants.', error: error.message });
    }
};

const displayMyRestaurant = async (req , res)=>{
    try {
        const user_id = req.user.userId
        console.log("nari");
        console.log(user_id);
        const getRestaurant = await Restaurant.findOne({
            user: user_id,
        })
                if (getRestaurant) {
            res.status(201).json({
                message : 'voila votre restaurant',
                data : getRestaurant
            })}
            else {
                res.json({
                    message : 'pas de restaurant',

                })
        }
       
        
    } catch (error) {
        console.log(error.message);
    }

    }


module.exports = {
    createRestaurant,
    getRestaurantByUserId,
    searchRestaurantByName,
    searchByCuisineType,
    displayRestaurants,
    searchByPlace,
    displayMyRestaurant
};
