function createRestaurantMiddleware(res, req, next) {
    const { error } = validate.validateCreateRestaurant(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    console.log("bbbb");
    next();
}

module.exports = createRestaurantMiddleware;
