const express = require('express');
const Currency = require('../models/currency').Currency;
const User = require('../models/user').User;
const router = express.Router();
const axios = require('axios');

function ajax(record) {
    let url = `${record.currency.apiURL}${record.address}`;

    return axios.get(url).then(res => {
        return {
            id: record._id,
            address: record.address,
            ticker: record.currency.ticker,
            name: record.currency.name,
            balance: res.data.balance
        };
    });
}

router.get('/', (req, res) => {
    let user = req.portfolioUser;
    let promises = [];

    user.portfolio.forEach(record => {
        promises.push(ajax(record));
    });

    Promise.all(promises).then(function() {
        res.send(arguments[0]);
    });
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

router.get('/currencies', (req, res) => {
    Currency.find({}).then(c => res.send(c));
});




module.exports = router;