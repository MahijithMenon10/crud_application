const mongoose = require('mongoose');

const ConsumerDataSchema = new mongoose.Schema({
  name: String,
  email: String,
  status: Boolean,
  date: {
    type: Date,
    default: Date.now,
  },
  phoneNumber: {
    type: Number,
  },
  about: String,
  dob: Date,
  skills: [String],
});

ConsumerDataSchema.index({ email: 1 });

const ConsumerData = mongoose.model('ConsumerData', ConsumerDataSchema);

module.exports = ConsumerData;
