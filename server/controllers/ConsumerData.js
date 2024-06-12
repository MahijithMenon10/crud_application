const mongoose = require('mongoose');
const ConsumerData = require('../models/ConsumerData');
const consumerDataService = require('../services/consumerDataService');
const getAllConsumerData = async (req, res) => {
  try {
    const consumerData = await consumerDataService.getConsumerData(req.query);
    const countDocuments = await consumerDataService.getCountDocuments(
      req.query
    );
    const totalPages = Math.ceil(countDocuments / 5);
    res.json({
      data: consumerData,
      statusCode: 200,
      message: 'Data Fetched Successfully',
      page: req.query.page,
      totalPages,
      countDocuments,
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
const getConsumerDataById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No consumer data with id: ${id}`);

  try {
    const consumerData = await ConsumerData.findById(id);
    res.json({
      data: consumerData,
      statusCode: 200,
      message: 'Data Fetched for a Single Id Successfully',
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createConsumerData = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.status) {
    return res.status(400).json({ message: 'Please fill all the fields' });
  }

  try {
    const consumerData = req.body;
    const newConsumerData = new ConsumerData(consumerData);
    await newConsumerData.save();
    res.json({
      message: 'Consumer Created Successfully',
      data: consumerData,
      statusCode: 201,
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const updateConsumerData = async (req, res) => {
  const { id } = req.params;
  const consumerData = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No consumer data with id: ${id}`);

  const updatedConsumerData = await ConsumerData.findByIdAndUpdate(
    id,
    { ...consumerData, id },
    { new: true }
  );

  res.json(updatedConsumerData);
};
const deleteConsumerData = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No consumer data with id: ${id}`);

  await ConsumerData.findByIdAndDelete(id);

  res.json({ message: 'Consumer data deleted successfully.' });
};

const updateConsumerStatusData = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No consumer data with id: ${id}`);

  const updatedConsumerData = await ConsumerData.findByIdAndUpdate(
    id,
    { status: status },
    { new: true }
  );

  res.json(updatedConsumerData);
};

module.exports = {
  deleteConsumerData,
  updateConsumerData,
  createConsumerData,
  getAllConsumerData,
  getConsumerDataById,
  updateConsumerStatusData,
};
