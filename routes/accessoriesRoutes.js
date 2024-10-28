const express = require('express');
const { createAccessories, getAccessories } = require('../controllers/accessariesController');

const router = express.Router();

router.post('/', createAccessories);
router.get('/', getAccessories);

module.exports = router;
