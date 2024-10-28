// packageController.js
const Package = require("../models/package");

const addPackage = async (req, res) => {
    try {
        const { name } = req.body;
        const packageExist = await Package.findOne({ name });
        if (packageExist) {
            return res.status(400).json({ msg: 'Duplicate package' });
        }
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

const getActivePackage = async(req,res)=>{
    try {
        const package = await Package.find({ isActive: true });
        res.json(package);
    } catch (error) {
        
        console.error(error);
        res.status(500).json({ msg: 'Error fetching active packages', error: error.message });
    }   
}

const getById = async(req,res)=>{
    try {
        const package = await Package.findById(req.params.id);
        if (!package) {
            return res.status(404).json({ msg: 'Package not found' });
        }
        res.json(package);
    } catch (error) {
        
        console.error(error);
        res.status(500).json({ msg: 'Error fetching package', error: error.message });
    }
}

module.exports = { addPackage, getPackage, getActivePackage,getById }; // Make sure to export it as an object
