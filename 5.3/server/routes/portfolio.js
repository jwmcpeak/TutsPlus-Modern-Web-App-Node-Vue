const express = require('express');
const Currency = require('../models/currency').Currency;
const User = require('../models/user').User;
const router = express.Router();

router.get('/currencies', (req, res) => {
    Currency.find({}).then(c => res.send(c));
});

router.post('/', (req, res) => {
    let user = req.portfolioUser;

    user.portfolio.push({
        address: req.body.address,
        currency: req.body.currency
    });

    user.save();

    return res.send({});
});


module.exports = router;