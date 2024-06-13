const mongoose = require('mongoose');
const ConsumerData = require('../models/ConsumerData');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECT);
    console.log('Connected to MongoDB');

    try {
      await ConsumerData.createIndexes({ createdAt: 1 });
    } catch (err) {
      console.error('Error creating index:', err);
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = connectDB;
