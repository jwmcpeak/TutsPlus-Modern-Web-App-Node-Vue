const express = require('express');
const Currency = require('../models/currency').Currency;
const router = express.Router();

router.get('/', (req, res) => {
    Currency.find({}).then(c => res.send(c));
});

router.post('/', (req, res) => {
    Currency.create({
        ticker: req.body.ticker,
        name: req.body.name,
        apiURL: req.body.apiURL
    }, (err, c) => {
        if (err) return res.status(400).send(err);

        res.send(c);
    });
});

module.exports = router;

