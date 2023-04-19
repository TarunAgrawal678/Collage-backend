const mongoose= require('mongoose');
const config = require('config.json');
const mongoString = process.env.DATABASE_URL || config.connectionString;
mongoose.connect(mongoString);
mongoose.Promise = global.Promise;

module.exports = {
    Admin: require('../models/admin.model')
};