// Import passwordSchema from model password
const passwordSchema = require('../models/password');

// Verify if the password respect the passwordSchema
module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {
        res.writeHead(400, '{"message":"Mot de passe requis : 8 caractères minimun, 1 Majuscule, 1 minuscule, sans espaces"}', {
            'content-type': 'application/json'
        });
        res.end('Mot de passe incorrect');
    } else {
        next();
    }
};