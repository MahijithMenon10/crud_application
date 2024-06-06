const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const consumerData = require('./routes/ConsumerData');
const bodyParser = require('body-parser');
const cors = require('cors');
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());
cors({ credentials: true, origin: true });
app.use(bodyParser.urlencoded({ extended: true }));
try {
  mongoose.connect(process.env.DB_CONNECT);
  console.log('Connected to MongoDB');
} catch (err) {
  console.log(err);
}
app.get('/', (req, res) => {
  res.send('Hello World');
});
app.use('/api', consumerData);
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
