//  Routes for ConsumerData are defined in this file.
const express = require('express');
const router = express.Router();

const {
  getAllConsumerData,
  getConsumerDataById,
  createConsumerData,
  updateConsumerData,
  deleteConsumerData,
  updateConsumerStatusData,
} = require('../controllers/dataControllers');

router
  .get('/fetchUsers', getAllConsumerData)
  .get('/fetchuser/:id', getConsumerDataById)
  .post('/createuser', createConsumerData)
  .put('/updateuser/:id', updateConsumerData)
  .delete('/deleteuser/:id', deleteConsumerData)
  .put('/statusupdate/:id', updateConsumerStatusData);

module.exports = router;
