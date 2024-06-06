const mongoose = require('mongoose');
const ConsumerData = require('../models/ConsumerData');

const getAllConsumerData = async (req, res) => {
  try {
    const { page } = req.query;
    const limit = 5;
    const startIndex = (page - 1) * limit;
    const total = await ConsumerData.countDocuments({});
    const consumerData = await ConsumerData.find()
      .limit(limit)
      .skip(startIndex);
    res.status(200).json({
      data: consumerData,
      statusCode: 200,
      message: 'Data Fetched Successfully',
      totalPages: Math.ceil(total / limit),
      countDocuments: total,
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

// const searchConsumerData = async (req, res) => {
//   const { name, email, date, isActive } = req.query;
//   let startDate, endDate;
//   const filteredData = [];

//   if (name) {
//     filteredData.push({ $match: { name: name } });
//   }
//   if (email) {
//     filteredData.push({ $match: { email: email } });
//   }
//   if (isActive !== undefined) {
//     filteredData.push({ $match: { status: isActive } });
//   }

//   if (date === 'This Month') {
//     const today = new Date();
//     startDate = new Date(today.getFullYear(), today.getMonth(), 1);
//     endDate = new Date(
//       today.getFullYear(),
//       today.getMonth() + 1,
//       0,
//       23,
//       59,
//       59,
//       999
//     );
//   }
//   if (date === 'Today') {
//     const today = new Date();
//     startDate = new Date(
//       today.getFullYear(),
//       today.getMonth(),
//       today.getDate(),
//       0,
//       0,
//       0,
//       0
//     );
//     endDate = new Date(
//       today.getFullYear(),
//       today.getMonth(),
//       today.getDate(),
//       23,
//       59,
//       59,
//       999
//     );
//   }

//   if (date === 'This Year') {
//     const today = new Date();
//     startDate = new Date(today.getFullYear(), 0, 1, 0, 0, 0, 0);
//     endDate = new Date(today.getFullYear(), 11, 31, 23, 59, 59, 999);
//   }

//   if (startDate && endDate) {
//     filteredData.push({
//       $match: {
//         createdAt: {
//           $gte: startDate,
//           $lt: endDate,
//         },
//       },
//     });
//   }

//   try {
//     const result = await ConsumerData.aggregate(filteredData);
//     res.json({ statusCode: 201, message: 'Search Successful', data: result });
//   } catch (err) {
//     res.json({ message: err.message });
//   }
// };

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
