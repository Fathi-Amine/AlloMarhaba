const Menu = require('../Models/Menu');

const createMenuItem = async (req, res) => {
    const { name, price, restaurant } = req.body;
    const image = req.file;
    console.log(image);

    try {
        let imageString = null;

        if (image) {
            // Convert base64 image to string
            const base64Data = req.file.buffer.toString('base64');
            imageString = `data:${req.file.mimetype};base64,${base64Data}`;        }
        const newItem = await Menu.create({ name, image :imageString , price, restaurant});
        return res.status(201).json({ message: 'Item added successfully', newItem });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};

const getMenuItems = async (req, res) => {
    try {
        const menuItems = await Menu.find();
        return res.status(200).json({ menu: menuItems });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getMenuItems, createMenuItem };