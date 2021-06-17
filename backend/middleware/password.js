const passwordSchema = require('../models/password');

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