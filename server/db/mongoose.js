const mongoose = require('mongoose');

const dbUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/DiabetesDiary';

mongoose.Promise = global.Promise;
mongoose.connect(dbUrl);

module.exports = mongoose;
