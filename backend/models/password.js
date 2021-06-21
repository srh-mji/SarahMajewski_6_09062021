// Get passwordValidator for password check
const passwordValidator = require('password-validator');

// Create passwordSchema for password more secure
const passwordSchema = new passwordValidator();

// Password constraints
passwordSchema
.is().min(8)
.has().uppercase()
.has().lowercase()
.has().digits()
.has().not().spaces()
.is().not().oneOf(['Passw0rd', 'Password123']);

// Export passwordSchema for declaration in route user.js
module.exports = passwordSchema;