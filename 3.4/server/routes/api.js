const express = require('express');
const login = require('./login');

const router = express.Router();

router.use(login);


module.exports = router;