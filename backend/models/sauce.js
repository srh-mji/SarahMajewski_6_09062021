// Get mongoose
const mongoose = require('mongoose');

// Create mongoose Schema
const sauceSchema = mongoose.Schema({
  // UserId 
  userId: {
    type: String,
    required: true
  },
  // Name sauce
  name: {
    type: String,
    required: true,
  },
  // Maker of the sauce
  manufacturer: {
    type: String,
    required: true,
  },
  // Description sauce
  description: {
    type: String,
    required: true,
  },
  // Ingredients of the sauce
  mainPepper: {
    type: String,
    required: true,
  },
  // Url image
  imageUrl: {
    type: String,
    required: true
  },
  // Heat
  heat: {
    type: Number,
    required: true
  },
  // Number of likes
  likes: {
    type: Number
  },
  // Number of dislike
  dislikes: {
    type: Number
  },
  // Users liked
  usersLiked: {
    type: [String]
  },
  // User disliked
  usersDisliked: {
    type: [String]
  },
})

// Export sauceSchema for being able to use model sauce to interact with the application
module.exports = mongoose.model('Sauce', sauceSchema);