const express = require('express');
const dotenv = require('dotenv');
const consumerData = require('./routes/ConsumerData');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const cors = require('cors');
const connectDB = require('./connections/db');
dotenv.config();

const app = express();
app.use(bodyParser.json());
cors({
  origin: ['http://localhost:5173', 'https://crud-application-psi.vercel.app/'],
});
cors({ credentials: true, origin: true });
app.use(bodyParser.urlencoded({ extended: true }));
connectDB();
app.get('/', (req, res) => {
  res.send('Hello World');
});
app.use('/api', consumerData);
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
