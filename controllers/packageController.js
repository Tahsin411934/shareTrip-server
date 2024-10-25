// packageController.js
const Package = require("../models/package");

const addPackage = async (req, res) => {
    try {
        const newPackage = new Package(req.body);
        await newPackage.save();
        res.json({ msg: 'Package created successfully', package: newPackage });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error creating package', error: error.message });
    }
};

const getPackage = async (req, res)=>{
    try {
        const package = await Package.find();
        res.json(package);
    } catch (error) {
        
        console.error(error);
        res.status(500).json({ msg: 'Error fetching packages', error: error.message });
    }
}

module.exports = { addPackage, getPackage }; // Make sure to export it as an object
