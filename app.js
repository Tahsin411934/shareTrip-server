const express = require('express');
const cors = require('cors');
const connectDB = require('./config/mongodb'); // MongoDB connection
const userRoutes = require('./routes/userRoutes');
const busRoutes = require('./routes/busRoutes');
const packageRoutes = require('./routes/packageRoutes');
const accessoriesRoutes = require('./routes/accessoriesRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to database
connectDB();

// Routes
app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/users', userRoutes); // User-related routes
app.use('/api/bus-schedule', busRoutes); // Bus schedule routes
app.use('/api/package', packageRoutes)
app.use('/api/accessories', accessoriesRoutes)

module.exports = app;
 