const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});

const menuSchema = Joi.object({
  name: Joi.string().required(),
  image : Joi.required(),
  price: Joi.number().required(),
  restaurant_id: Joi.string().required(),
  // Add more validation rules for other fields as needed
});

const validationMenu = (req, res, next) => {
    console.log('cc');
  const { error } = menuSchema.validate(req.body);

  if (error) {
    // Handle validation error
    return res.status(400).json({ errors: error.message});
  }

  // Validation passed, proceed to the next middleware
  next();
};

module.exports = validationMenu;

// const Joi = require('joi');
// const validator = require('express-joi-validation').createValidator({});


// const validationMenu = async (req ,res , next)=>{ 

//     const menuSchema = Joi.object({
//         name: Joi.string().required(),
//         price: Joi.number().required(),
//         restaurant: Joi.string().required(),
//         // Add more validation rules for other fields as needed
//     });
// }

// const validation = validator.body(menuSchema);

// module.exports = validationMenu;
