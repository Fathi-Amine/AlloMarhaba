const validateRestaurant = require("../../validator/restaurantValidator");
const Restaurant = require("../../Models/Restaurant");

async function createRestaurant(req, res) {
    const { error } = validateRestaurant.validateCreateRestaurant(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    console.log(req.user);

    try {
        const savedRestaurant = await Restaurant.create({
            user: "65377f3aaa95d6ff01c0613f",
            name: req.body.name,
            adress: req.body.adress,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            phone: req.body.phone,
            image: req.body.image,
            cuisineType: req.body.cuisineType,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
        });
    } catch (err) {
        return res.status(400).send({ error: err });
    }
    return res.status(201).json({
        success: "Restaurant created successfully",
    });
}

async function getRestaurantByUserId(req, res) {
    console.log("cdcdccd");
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

module.exports = {
    createRestaurant,
    getRestaurantByUserId,
};
