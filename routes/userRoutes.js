const express = require('express');
const { getUserByEmail, registerUser, updateUser, getUsers } = require('../controllers/userController');

const router = express.Router();

// Routes for user
router.get('/:email', getUserByEmail);
router.post('/register', registerUser);
router.put('/:id', updateUser);
router.get('/', getUsers);

module.exports = router;
