const User = require('../models/user').User;
const jwt = require('jsonwebtoken');
const config = require('../config');

function isAuthenticated(req, res, next) {
    let token = req.get('Authorization');

    if (!token) return res.status(403).send({message: 'No token'});

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) return res.status(403).send({message: 'Invalid token'});

        User.findById(decoded.id, (err, user) => {
            if (err) return res.status(403).send({message: 'Invalid token'});
            if (!user) return res.status(403).send({message: 'Invalid token'});

            req.portfolioUser = user;
            next();
        });

    });
}

module.exports = {
    isAuthenticated
};