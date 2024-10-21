require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/mongodb');
const User = require('./models/user');
const bcrypt = require('bcrypt');

const app = express();
const port = process.env.PORT || 5000;

// MIDDLEWARE
app.use(express.json());
app.use(cors());

// DB CONNECTION
connectDB();

// ROUTES
app.get('/', (req, res) => {
    res.send('API is running...');
});

app.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validation
        if (!username || !email || !password) {
            return res.status(400).json({ msg: 'Please enter all fields' });
        }

        // Check for existing user
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ msg: 'User already exists' });

        // Create a new user
        const newUser = new User({ username, email, password });

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);

        await newUser.save();

        res.json({ msg: 'User created successfully' });
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
