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

router.put('/:currencyId', (req, res) => {
    let currencyId = req.params.currencyId;

    Currency.update({_id: currencyId}, {
        ticker: req.body.ticker,
        name: req.body.name,
        apiURL: req.body.apiURL
    }, (err, num) => {
        if (err) return res.status(404).send(err);

        res.send({affected: num});
    });
});

router.delete('/:currencyId', (req, res) => {
    let currencyId = req.params.currencyId;

    Currency.deleteOne({_id: currencyId}, (err) => {
        if (err) return res.status(404).send(err);

        res.send({success: true});
    });
});

module.exports = router;

