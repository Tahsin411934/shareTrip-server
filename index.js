require('dotenv').config();
const app = require('./app'); // Import the express app

const port = process.env.PORT || 5000;

// Start the server
app.listen(port, () => console.log(`Server running on port ${port}`));
   