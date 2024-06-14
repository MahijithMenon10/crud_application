// index.js is the entry point of the application. It is responsible for starting the server, requiring the necessary modules, and defining the routes.
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
const allowedOrigins = [
  'https://crud-application-psi.vercel.app',
  'http://localhost:5173',
];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
connectDB();
app.get('/', (req, res) => {
  res.send('Hello World');
});
app.use('/api', consumerData);
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
