const mongoose = require('mongoose');

const dbUrl = 'mongodb://localhost:27017/DiabetesDiary';

mongoose.Promise = global.Promise;
mongoose.connect(dbUrl);

module.exports = mongoose;
