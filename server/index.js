const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const consumerData = require('./routes/ConsumerData');
const bodyParser = require('body-parser');
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000;
try {
  mongoose.connect(process.env.DB_CONNECT);
  console.log('Connected to MongoDB');
} catch (err) {
  console.log(err);
}

app.use('/data', consumerData);
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
