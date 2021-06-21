// Import express module for being able to use express Router
const express = require('express');
// Call Router
const router = express.Router();

// Import the controller to associate the functions to the different routes
const userCtrl = require('../controllers/user');

// Add middleware
// For password verification
const verifyPassword = require('../middleware/password');

// Creation of the different routes of the API
router.post('/signup', verifyPassword, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;