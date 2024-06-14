// This file contains  the controllers for the application. It uses the ConsumerData model to interact with the database.
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
    return res.json({ message: 'Invalid id provided', statusCode: 404 });

  const consumerData = await consumerDataService.getConsumerDataById(id);
  res.json({
    data: consumerData,
    message: 'Consumer Data Fetched By Id Successfully',
    statusCode: 200,
  });
};

const createConsumerData = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.status) {
    return res.status(400).json({ message: 'Please fill all the fields' });
  }

  try {
    const consumerData = req.body;
    const newConsumerData = new ConsumerData(consumerData);

    const savedConsumerData = await newConsumerData.save();
    res.json({
      message: 'Consumer Created Successfully',
      data: savedConsumerData,
      statusCode: 201,
    });
  } catch (err) {
    res.json({ message: err.message, statusCode: 500 });
  }
};

const updateConsumerData = async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No consumer data with id: ${id}`);

  const updatedConsumerData = await ConsumerData.findByIdAndUpdate(
    id,
    { ...changes },
    { new: true, runValidators: true }
  );

  res.json({
    data: updatedConsumerData,
    message: 'Consumer Updated Successfully',
    statusCode: 200,
  });
};
const deleteConsumerData = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.json({
      message: 'Invalid id provided. Please provide a valid id.',
      statusCode: 404,
      id: id,
    });

  const deletedData = await ConsumerData.findByIdAndDelete(id);

  if (!deletedData) {
    return res.json({
      message: 'Consumer data not found',
      statusCode: 404,
      id: id,
    });
  }

  res.json({
    id: id,
    message: 'Consumer data deleted successfully.',
    statusCode: 200,
  });
};

const updateConsumerStatusData = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res
      .status(404)
      .json({ message: `No consumer data with id: ${id}`, statusCode: 404 });

  try {
    const updatedConsumerData = await ConsumerData.findByIdAndUpdate(
      id,
      { status: status },
      { new: true }
    );

    if (!updatedConsumerData) {
      return res
        .status(404)
        .json({ message: `No consumer data with id: ${id}`, statusCode: 404 });
    }

    res.json({
      data: updatedConsumerData,
      message: 'Consumer Status Updated Successfully',
      statusCode: 200,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  deleteConsumerData,
  updateConsumerData,
  createConsumerData,
  getAllConsumerData,
  getConsumerDataById,
  updateConsumerStatusData,
};
