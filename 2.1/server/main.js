const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');

module.exports = {
    start() {
        const app = express();

        mongoose.connect(config.connectionString, {useNewUrlParser: true});

        app.use(bodyParser.json());
        app.use(cors());

        app.get('/', (req, res) => res.send('hello world'));

        app.listen(4000, () => {
            console.log('Listening at http://localhost:4000');
        });
    }
}