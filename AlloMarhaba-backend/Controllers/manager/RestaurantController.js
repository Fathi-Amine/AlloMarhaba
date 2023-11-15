const validateRestaurant = require("../../validator/restaurantValidator");
const Restaurant = require("../../Models/Restaurant");

async function createRestaurant(req, res) {
    const { error } = validateRestaurant.validateCreateRestaurant(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

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

module.exports = {
    createRestaurant,
};
