const CuisineType = require('../Models/CuisineType')

const displayCuisineType = async (req, res) => {
    try {
        const cuisineType = await CuisineType.find();
        // console.log(cuisineType)
        res.json(cuisineType);
    } catch (error) {
        console.error('Error fetching cuisine tyoe:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    displayCuisineType
};