const express = require('express');
const router = express.Router();

const {
  getAllConsumerData,
  getConsumerDataById,
  createConsumerData,
  searchConsumerData,
  updateConsumerData,
  deleteConsumerData,
  updateConsumerStatusData,
} = require('../controllers/ConsumerData');

router.get('/pages/:page', getAllConsumerData);
router.get('/user/:id', getConsumerDataById);
router.get('/search', searchConsumerData);
router.post('/create', createConsumerData);
router.put('/update/:id', updateConsumerData);
router.delete('/delete/:id', deleteConsumerData);
router.put('/statusupdate/:id', updateConsumerStatusData);

module.exports = router;
