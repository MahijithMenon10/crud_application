const express = require('express');
const router = express.Router();

const {
  getAllConsumerData,
  getConsumerDataById,
  createConsumerData,
  updateConsumerData,
  deleteConsumerData,
  updateConsumerStatusData,
} = require('../controllers/ConsumerData');

router.get('/fetchUsers', getAllConsumerData);
router.get('/fetchuser/:id', getConsumerDataById);
router.post('/createuser', createConsumerData);
router.put('/updateuser/:id', updateConsumerData);
router.delete('/deleteuser/:id', deleteConsumerData);
router.put('/statusupdate/:id', updateConsumerStatusData);

module.exports = router;
