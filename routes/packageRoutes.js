const express = require('express');
const { addPackage, getPackage } = require('../controllers/packageController');
const router = express.Router();

// Define the route to add a package
router.post('/', addPackage);
router.get('/', getPackage);

module.exports = router;
