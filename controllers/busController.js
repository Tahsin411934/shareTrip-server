const BusSchedule = require('../models/busSchedule');

// Add new bus schedule
const addBusSchedule = async (req, res) => {
    try {
        const newBusSchedule = new BusSchedule(req.body);
        await newBusSchedule.save();
        res.json({ msg: 'Bus schedule created successfully', busSchedule: newBusSchedule });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error creating bus schedule', error: error.message });
    }
};

// Helper functions for random selection
const randomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomPrice = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Locations, bus names, and classes to choose from
const locations = ["Dhaka", "Chattogram", "cox", "Sylhet"];
const busNames = ["Express Line", "City Rider", "GreenLine", "Sky Travels", "BlueLine"];
const classes = ["AC", "Non AC"];

// Insert new bus schedule every 6 minutes
const insertBusScheduleEverySixMinutes = () => {
    setInterval(async () => {
        try {
            // Select 'from' and 'to' randomly but ensure they aren't the same
            let from = randomElement(locations);
            let to;
            do {
                to = randomElement(locations);
            } while (from === to);

            // Generate other random data
            const scheduleData = {
                busNumber: Math.floor(Math.random() * 9000) + 1000, // 4-digit random number
                busName: randomElement(busNames),
                class: randomElement(classes),
                from,
                to,
                departureTime: new Date(),
                arrivalTime: new Date(Date.now() + 3 * 60 * 60 * 1000), // 3 hours later
                seatsAvailable: Math.floor(Math.random() * 30) + 20, // Random seats between 20 and 50
                price: randomPrice(500, 2000),
                date: new Date()
            };

            const newSchedule = new BusSchedule(scheduleData);
            await newSchedule.save();
            console.log("New bus schedule inserted:", newSchedule);
        } catch (error) {
            console.error("Error inserting bus schedule:", error);
        }
    }, 360000); // Inserts data every 6 minutes
};

// Get bus schedules by date
const getBusSchedulesByDate = async (req, res) => {
    const { date, from, to } = req.query;

    if (!date || !from || !to || date === 'null') {
        return res.status(400).json({ msg: 'Date, from, and to fields are required' });
    }

    try {
        const busSchedules = await BusSchedule.find({
            date: {
                $gte: new Date(date),
                $lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1))
            },
            from,
            to
        });

        if (busSchedules.length === 0) {
            return res.status(404).json({ msg: 'No bus schedules found for the specified date and route' });
        }

        res.json(busSchedules);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error fetching bus schedules', error: error.message });
    }
};

// Start the schedule insertion function every 6 minutes
insertBusScheduleEverySixMinutes();

// Export the functions
module.exports = { addBusSchedule, getBusSchedulesByDate };
