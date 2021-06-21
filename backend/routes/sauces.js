// Import express module for being able to use express Router
const express = require('express');
// Call Router
const router = express.Router();

// Add middleware
// For authentification (secure the roads)
const auth = require('../middleware/auth');
// For image management
const multer = require('../middleware/multer-config');

// Import the controller to associate the functions to the different routes
const saucesCtrl = require('../controllers/sauces');

// Creation of the different routes of the API
router.get('/', auth, saucesCtrl.getAllSauce);
router.post('/', auth, multer, saucesCtrl.createSauce);
router.get('/:id', auth, saucesCtrl.getOneSauce);
router.put('/:id', auth, multer, saucesCtrl.modifySauce);
router.delete('/:id', auth, saucesCtrl.deleteSauce);
router.post('/:id/like', auth, saucesCtrl.likeDislike);

module.exports = router;