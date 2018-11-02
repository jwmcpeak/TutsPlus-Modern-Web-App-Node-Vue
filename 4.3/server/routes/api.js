const express = require('express');
const login = require('./login');
const currencies = require('./currencies');

const router = express.Router();

router.use(login);
router.use('/currencies', currencies);


module.exports = router;