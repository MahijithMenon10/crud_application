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
  'https://crud-application-psi.vercel.app/',
  'http://localhost:5173',
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          'The CORS policy for this site does not ' +
          'allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
connectDB();
app.get('/', (req, res) => {
  res.send('Hello World');
});
app.use('/api', consumerData);
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
