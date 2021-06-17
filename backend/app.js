/* app.js allows access to images, User routes, Sauce routes*/

// Import express module
const express = require('express');

// Use mongoose to be able to use the database
const mongoose = require('mongoose');

// Import helmet to secure Express app by setting various HTTP headers
const helmet = require("helmet");

// Access to the path of our file system
const path = require('path');

// Sanitize the received data, and remove any offending keys, or replace the characters with a 'safe' one.
const mongoSanitize = require('express-mongo-sanitize');

// Hide database connection information
require('dotenv').config();

// Routes declaration
const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

// Connection to the MongoDB database
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex : true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
  
// Create express application
const app = express();

// Middleware Header which unblocks some CORS security systems error
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Transforms the data from the POST request into exploitable JSON object
app.use(express.json());

// Secure Express
app.use(helmet());


app.use(mongoSanitize());

// Middleware which allows you to load the files in the images directory
app.use('/images', express.static(path.join(__dirname, 'images')));

// Middleware transmit requests to these urls to the corresponding routes
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

// Export of the express application for declaration in server.js
module.exports = app;