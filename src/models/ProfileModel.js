const mongoose = require('mongoose');
const DataSchema = mongoose.Schema({
    FirstName: {type: String},
    LastName: {type: String},
    Email: {type: String},
    Password: {type: String},
    Mobile: {type: String},
    City: {type: String},
    UserName: {type: String, unique: true},
}, {versionKey: false});

const profileModel = mongoose.model('Profile', DataSchema, 'Profile');

module.exports = profileModel;