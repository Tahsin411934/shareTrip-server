const BusSchedule = require('../models/busSchedule');

// Add new bus schedule
const addBusSchedule = async (req, res) => {
    try {
        const newBusSchedule = new BusSchedule(req.body);
        await newBusSchedule.save();
        res.json({ msg: 'Bus schedule created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error creating bus schedule', error: error.message });
    }
};

// Get bus schedules by date
const getBusSchedulesByDate = async (req, res) => {
    const { date } = req.query; // Get the date from the query parameter

    if (!date) {
        return res.status(400).json({ msg: 'Date is required' });
    }

    try {
        const busSchedules = await BusSchedule.find({
            date: {
                $gte: new Date(date), // Greater than or equal to the start of the day
                $lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1)) // Less than the start of the next day
            }
        });
        
        if (busSchedules.length === 0) {
            return res.status(404).json({ msg: 'No bus schedules found for this date' });
        }

        res.json(busSchedules);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error fetching bus schedules', error: error.message });
    }
};

// Export the functions
module.exports = { addBusSchedule, getBusSchedulesByDate };
