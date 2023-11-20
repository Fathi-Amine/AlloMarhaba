const Menu = require('../../Models/Menu');

const createMenuItem = async (req, res) => {
    const { name, image , price, restaurant } = req.body;
    console.log(req.body);

    try {

        const newItem = await Menu.create({ name, image , price, restaurant});
        return res.status(201).json({ message: 'Item added successfully', newItem });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getMenuItems = async (req, res) => {
    try {
        const menuItems = await Menu.find();
        return res.status(200).json({ menu: menuItems });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

const updateMenuItem = async (req, res) => {
    const { id } = req.params;
    const { name, price, restaurant } = req.body;
    console.log('c"est le nom  ',req.body);

    try {
        const existingItem = await Menu.findOneAndUpdate({ _id: id }, { name, price, restaurant }, { new: true });

        if (!existingItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }

        // Save the updated menu item
        // await existingItem.;

        return res.status(200).json({ message: 'Menu item updated successfully', updatedItem: existingItem });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

const updateMenuImage = async(req, res)=>{
    const { id } = req.params;
    const base64Data = req.file.buffer.toString('base64');
    imageString = `data:${req.file.mimetype};base64,${base64Data}`;  
    try {
        const existingItem = await Menu.findOneAndUpdate({ _id: id }, { image : imageString }, { new: true });

        if (!existingItem) {
            return res.status(404).json({ message: 'Menu Image not found' });
        }


        return res.status(200).json({ message: 'Menu Image updated successfully', updatedItem: existingItem });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }

}

const deleteMenuItem = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedItem = await Menu.deleteOne({_id :id});

        if (!deletedItem) {
            return res.status(404).json({ message: 'Menu item not found'});
        }

        return res.status(200).json({ message: 'Menu item deleted successfully', deletedItem });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};



module.exports = { getMenuItems, createMenuItem , updateMenuItem , updateMenuImage, deleteMenuItem};