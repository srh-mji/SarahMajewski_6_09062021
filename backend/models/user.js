// Get mongoose
const mongoose = require('mongoose');
// Get uniqueValidator
const uniqueValidator = require('mongoose-unique-validator');

// Create mongoose Schema
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Use uniqueValidator to guarantee a unique email
userSchema.plugin(uniqueValidator);

// Export userSchema for being able to use model user to interact with the application
module.exports = mongoose.model('User', userSchema);