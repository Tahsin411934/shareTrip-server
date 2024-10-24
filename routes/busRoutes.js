const express = require('express');
const { addBusSchedule, getBusSchedulesByDate } = require('../controllers/busController');

const router = express.Router();

// Route for bus schedule
router.post('/', addBusSchedule);
router.get('/by-date', getBusSchedulesByDate);

module.exports = router;
