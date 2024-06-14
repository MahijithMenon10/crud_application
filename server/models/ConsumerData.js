const mongoose = require('mongoose');

const ConsumerDataSchema = new mongoose.Schema({
  name: String,
  email: String,
  status: Boolean,
  date: {
    type: Date,
    default: Date.now,
    index: true,
  },
  phoneNumber: {
    type: Number,
  },
  about: String,
  dob: Date,
});

const ConsumerData = mongoose.model('ConsumerData', ConsumerDataSchema);

module.exports = ConsumerData;
