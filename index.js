require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/mongodb');
const User = require('./models/user');
const bcrypt = require('bcrypt');
const BusSchedule = require('./models/busSchedule');
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
 
app.get('/api/user/:email', async (req, res) => {
    const email = req.params.email;
    try {
        const user = await User.findOne({ email });
        if (user) {
            res.status(200).json(user); // Send user data as JSON response
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user' });
    }
});
 
app.post('/register', async (req, res) => {
    try {
        const { name, mobileNumber, email, password } = req.body; // Removed username

        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({ msg: 'Please enter all fields' });
        }

        // Check for existing user
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ msg: 'User already exists' });

        // Create a new user
        const newUser = new User({ name, mobileNumber, email, password }); 

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

 
app.post('/addBusSchedule', async (req, res) => {
    try {
        const newBusSchedule = new BusSchedule(req.body); // Create a new instance of BusSchedule
        await newBusSchedule.save(); // Save the new bus schedule to the database
        res.json({ msg: 'Bus schedule created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error creating bus schedule', error: error.message });
    }
});

// GET: Fetch all registered users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();  // Exclude password from the response
        res.json(users);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});




app.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params; // URL থেকে id সংগ্রহ করা
        const { name, email,mobileNumber, password, role } = req.body; // রিকোয়েস্ট বডি থেকে ডেটা সংগ্রহ করা

        
        const updatedData = {
            name,
            email,
            mobileNumber,
            role,
            updatedAt: Date.now() 
        };

        if (password) {
            const salt = await bcrypt.genSalt(10);
            updatedData.password = await bcrypt.hash(password, salt);
        }

       
        const updatedUser = await User.findByIdAndUpdate(id, updatedData, { new: true });

        
        if (!updatedUser) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.json({ msg: 'User updated successfully', user: updatedUser });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});


// app.delete('/users/:id', async (req, res) => {
//     try {
//         const { id } = req.params; // URL থেকে id সংগ্রহ করা

//         // ইউজার মুছে ফেলা হচ্ছে
//         const deletedUser = await User.findByIdAndDelete(id);

//         // যদি ইউজার খুঁজে না পাওয়া যায়
//         if (!deletedUser) {
//             return res.status(404).json({ msg: 'User not found' });
//         }

//         res.json({ msg: 'User deleted successfully' });
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send('Server Error');
//     }
// });

app.listen(port, () => console.log(`Server running on port ${port}`));
