/* app.js allows access to images, User routes, Sauce routes*/

// Import express module
const express = require('express');

// Allow you to extract the JSON object from POST requests
const bodyParser = require('body-parser');

// Use mongoose to be able to use the database
const mongoose = require('mongoose');

// Access to the path of our file system
const path = require('path');

// Routes declaration
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

// Connection to the MongoDB database
mongoose.connect('mongodb+srv://sarah:SG050617@cluster0.gllqi.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Create express application
const app = express();

// Middleware Header which unblocks some CORS security systems error
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Transforms the data from the POST request into exploitable JSON object
app.use(bodyParser.json());

// Middleware which allows you to load the files in the images directory
app.use('/images', express.static(path.join(__dirname, 'images')));

// Middleware transmit requests to these urls to the corresponding routes
app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);

// Export of the express application for declaration in server.js
module.exports = app;