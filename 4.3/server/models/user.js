const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CurrencySchema = require('./currency').Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        index: true
    },
    password: String,
    isAdmin: Boolean,
    portfolio: [{
        address: String,
        currency: CurrencySchema
    }]
});

const User = mongoose.model('users', UserSchema);

module.exports = {
    Schema: UserSchema,
    User
};