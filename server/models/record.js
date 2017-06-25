const mongoose = require('mongoose');

const Record = mongoose.model('Record', {
  sugarLevel: {
    type: Number,
  },
  bloodPressure: {
    type: Number,
  },
  timestamp: {
    type: Number,
  },
});

module.exports = Record;
