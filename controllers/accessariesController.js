const Accessories = require('../models/accessories.js');

const createAccessories = async (req, res) => {
    try {
        const newAccessories = new Accessories(req.body);
        await newAccessories.save();
        res.json({ msg: 'Accessories created successfully', accessories: newAccessories });
    } catch (error) {
        res.status(500).json({ msg: 'Error creating accessories', error: error.message });
    }
};


const  getAccessories = async (req, res) => {
    try {
        const accessories = await Accessories.find();
        res.json(accessories);
    } catch (error) {
        res.status(500).json({ msg: 'Error fetching accessories', error: error.message });
    }
}


module.exports = { createAccessories, getAccessories };
