const express = require('express');
const login = require('./login');
const currencies = require('./currencies');
const portfolio = require('./portfolio');

const auth = require('./auth');

const router = express.Router();

router.use(login);
router.use('/currencies', currencies);
router.use('/portfolio', auth.isAuthenticated, portfolio);






module.exports = router;