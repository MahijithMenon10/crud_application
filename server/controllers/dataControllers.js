// This file contains  the controllers for the application. It uses the ConsumerData model to interact with the database.
const mongoose = require('mongoose');
const ConsumerData = require('../models/ConsumerData');
const consumerDataService = require('../services/consumerDataService');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const countAllUsers = async (req, res) => {
  try {
    const count = await ConsumerData.countDocuments();
    res.json({ data: count, message: 'Total Users Count', statusCode: 200 });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

const countActiveUsers = async (req, res) => {
  try {
    const count = await ConsumerData.countDocuments({ status: true });
    res.json({ data: count, message: 'Active Users Count', statusCode: 200 });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

const loginConsumer = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  try {
    const user = await ConsumerData.findOne({ email });

    if (!user) {
      return res.status(400).send('Invalid email or password');
    }

    const isPasswordCorrect = bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).send('Invalid email or password');
    }
    const userDetails = {
      name: user.name,
      email: user.email,
    };
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
    res.json({
      statusCode: 200,
      message: 'User logged in successfully',
      data: { userDetails, token },
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const registerConsumer = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).send('Please provide all fields');
  }

  try {
    const user = await ConsumerData.findOne({ email });
    if (user) {
      return res.status(400).send('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new ConsumerData({ name, email, password: hashedPassword });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);
    const userDetails = {
      name: newUser.name,
      email: newUser.email,
      userId: newUser._id,
    };
    res.status(200).json({
      data: { userDetails, token },
      message: 'User registered successfully',
      statusCode: 200,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Internal server error');
  }
};

const getAllConsumerData = async (req, res) => {
  try {
    const consumerData = await consumerDataService.getConsumerData(req.query);
    const countDocuments = await consumerDataService.getCountDocuments(
      req.query
    );
    const totalPages = Math.ceil(countDocuments / 5);

    // Check if consumerData is empty
    if (consumerData.length === 0) {
      return res.status(404).json({
        statusCode: 404,
        message: 'No data found',
        page: req.query.page || 1,
        totalPages: 0,
        countDocuments: 0,
      });
    }

    res.status(200).json({
      data: consumerData,
      statusCode: 200,
      message: 'Data Fetched Successfully',
      page: req.query.page || 1,
      totalPages,
      countDocuments,
    });
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error fetching consumer data:', error);

    // Respond with a generic error message to avoid exposing sensitive information
    res.status(500).json({
      statusCode: 500,
      message: 'An error occurred while fetching data',
    });
  }
};
const getConsumerDataById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res
      .status(404)
      .json({ message: 'Invalid id provided', statusCode: 404 });

  const consumerData = await consumerDataService.getConsumerDataById(id);

  if (!consumerData) {
    // If no data is found for the given ID, return a 404 response
    return res.status(404).json({
      message: 'No consumer data found with the provided ID',
      statusCode: 404,
    });
  }

  res.json({
    data: consumerData,
    message: 'Consumer Data Fetched By Id Successfully',
    statusCode: 200,
  });
};

const createConsumerData = async (req, res) => {
  const { name, email, about, phoneNumber, dob, status } = req.body;

  if (
    !name ||
    !email ||
    !about ||
    !phoneNumber ||
    !dob ||
    status === undefined
  ) {
    return res
      .status(400)
      .json({ message: 'Please fill all the fields', statusCode: 400 });
  }

  try {
    const consumerData = { name, email, about, phoneNumber, dob, status };
    console.log(consumerData);

    const newConsumerData = new ConsumerData(consumerData);

    const savedConsumerData = await newConsumerData.save();
    res.json({
      message: 'Consumer Created Successfully',
      data: savedConsumerData,
      statusCode: 201,
    });
  } catch (err) {
    // Handle specific error types if needed, e.g., duplicate key error
    let errorMessage = 'An error occurred while creating consumer data';
    if (err.code === 11000) {
      errorMessage = 'A consumer with the given email already exists';
    }
    res
      .status(500)
      .json({ message: errorMessage, statusCode: 500, error: err.message });
  }
};

const updateConsumerData = async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json({
      data: null,
      message: `No consumer data with id: ${id}`,
      statusCode: 404,
    });
  }
  const updatedConsumerData = await ConsumerData.findByIdAndUpdate(
    id,
    { ...changes },
    { new: true, runValidators: true }
  );

  if (!updatedConsumerData) {
    return res.status(404).json({
      data: null,
      message: `No consumer data found with id: ${id}`,
      statusCode: 404,
    });
  }

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
  loginConsumer,
  registerConsumer,
  deleteConsumerData,
  updateConsumerData,
  createConsumerData,
  getAllConsumerData,
  getConsumerDataById,
  updateConsumerStatusData,
  countAllUsers,
  countActiveUsers,
};
