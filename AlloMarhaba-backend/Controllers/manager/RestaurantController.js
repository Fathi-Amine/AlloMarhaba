const validateRestaurant = require("../../validator/restaurantValidator");
const Restaurant = require("../../Models/Restaurant");

async function createRestaurant(req, res) {
    const { error } = validateRestaurant.validateCreateRestaurant(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    // console.log(req.body);

    // return res.status(200).json({ data: req.body });
    console.log("inside messi");
    const slug = req.body.name.replace(/\s+/g, "").toLowerCase();
    console.log("slug");
    console.log(slug);
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    const newSlug = slug + randomNumber;
    console.log("newSlug");
    console.log(newSlug);

    try {
        const savedRestaurant = await Restaurant.create({
            user: req.user.userId,
            name: req.body.name,
            slug: newSlug,
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
        return res.status(400).send({ error: err });
    }
}

async function getRestaurantByUserId(req, res) {
    let id = req.user.userId;
    // let id = "6555d5741c8149f78acd28c8";
    try {
        const restaurant = await Restaurant.find({
            user: id,
        });
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
