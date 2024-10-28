const express = require('express');
const { addPackage, getPackage, getActivePackage,getById } = require('../controllers/packageController');
const router = express.Router();

// Define the route to add a package
router.post('/', addPackage);
router.get('/', getPackage);
router.get('/activePackage', getActivePackage);
router.get('/:id', getById);

module.exports = router;
