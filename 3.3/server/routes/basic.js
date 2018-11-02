const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user').User;

const router = express.Router();

router.get('/', (req, res) => res.send('Status: good'));

router.get('/setup', (req, res) => {
    User.findOne({email: 'admin@admin.com'}, (err, doc) => {
        if (doc != null) return res.send({});
        
        let user = new User({
            email: 'admin@admin.com',
            password: bcrypt.hashSync('password', 8),
            isAdmin: true
        });

        user.save((err) => {
            if (err) return res.send(err);

            res.send({success: true});
        });
    });
});

module.exports = router;