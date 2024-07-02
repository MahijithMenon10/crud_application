//  Routes for ConsumerData are defined in this file.
const express = require('express');
const router = express.Router();

const {
  loginConsumer,
  registerConsumer,
  getAllConsumerData,
  getConsumerDataById,
  createConsumerData,
  updateConsumerData,
  deleteConsumerData,
  countAllUsers,
  countActiveUsers,

  updateConsumerStatusData,
} = require('../controllers/dataControllers');

router
  .post('/login', loginConsumer)
  .post('/register', registerConsumer)
  .get('totalUsers', countAllUsers)
  .get('activeUsers', countActiveUsers)
  .get('/fetchUsers', getAllConsumerData)
  .get('/fetchuser/:id', getConsumerDataById)
  .post('/createuser', createConsumerData)
  .put('/updateuser/:id', updateConsumerData)
  .delete('/deleteuser/:id', deleteConsumerData)
  .put('/statusupdate/:id', updateConsumerStatusData);

module.exports = router;
