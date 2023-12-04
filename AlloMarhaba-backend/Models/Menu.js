const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String, // Assuming you store the image URL
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    restaurant_id: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Restaurant',
        }, 
  
    
    
});

module.exports = mongoose.model('Menu', MenuSchema);
