const Joi = require("joi");

// Register Validation
function validateCreateRestaurant(body) {
    const registerSchema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        adress: Joi.string().min(3).max(50).required(),
        city: Joi.string().min(3).max(50).required(),
        state: Joi.string().min(3).max(50).required(),
        country: Joi.string().min(3).max(50).required(),
        phone: Joi.string().min(3).max(50).required(),
        image: Joi.string().required(),
        cuisineType: Joi.string().min(3).max(50).required(),
        latitude: Joi.string().required(),
        longitude: Joi.string().required(),
    });
    return registerSchema.validate(body);
}

module.exports = {
    validateCreateRestaurant,
};
