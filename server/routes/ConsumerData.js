const express = require('express');
const router = express.Router();

const {
  getAllConsumerData,
  getConsumerDataByEmail,
  createConsumerData,
  searchConsumerData,
  updateConsumerData,
  deleteConsumerData,
} = require('../controllers/ConsumerData');

router.get('pages/:page', getAllConsumerData);
router.get('/:id', getConsumerDataByEmail);
router.get('/search', searchConsumerData);
router.post('/', createConsumerData);
router.put('/:id', updateConsumerData);
router.delete('/:id', deleteConsumerData);

module.exports = router;
