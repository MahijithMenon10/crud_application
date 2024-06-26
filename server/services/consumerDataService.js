// Services for consumerData are defined in consumerDataService.js.
// This file is responsible for fetching data from the database and returning it to the client.
const ConsumerData = require('../models/ConsumerData');

const getConsumerData = async ({ page, date, status, email, name }) => {
  const limit = 5;
  const extraDataLimit = 5;
  const startIndex = (page - 1) * limit;
  let dateFilter = {};
  const today = new Date();
  if (date === 'Today') {
    dateFilter = {
      createdAt: {
        $gte: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          0,
          0,
          0,
          0
        ),
        $lt: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          23,
          59,
          59,
          999
        ),
      },
    };
  } else if (date === 'This week') {
    const firstDayOfWeek = today.getDate() - today.getDay();
    const lastDayOfWeek = firstDayOfWeek + 6;
    dateFilter = {
      $gte: new Date(today.setDate(firstDayOfWeek)),
      $lt: new Date(today.setDate(lastDayOfWeek)),
    };
  } else if (date === 'this month') {
    dateFilter = {
      $gte: new Date(today.getFullYear(), today.getMonth(), 1),
      $lt: new Date(today.getFullYear(), today.getMonth() + 1, 0),
    };
  }
  const statusFilter = status ? { status: status === 'true' } : {};
  const emailFilter = email
    ? { email: { $regex: new RegExp(email, 'i') } }
    : {};
  const nameFilter = name ? { name: { $regex: new RegExp(name, 'i') } } : {};
  const consumerData = await ConsumerData.find({
    ...dateFilter,
    ...statusFilter,
    ...emailFilter,
    ...nameFilter,
  })
    .limit(limit + extraDataLimit)
    .skip(startIndex)
    .sort('-date');

  return consumerData;
};

const getCountDocuments = async ({ date, status, email, name }) => {
  let dateFilter = {};
  const today = new Date();
  if (date === 'Today') {
    dateFilter = {
      createdAt: {
        $gte: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          0,
          0,
          0,
          0
        ),
        $lt: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          23,
          59,
          59,
          999
        ),
      },
    };
  } else if (date === 'This week') {
    const firstDayOfWeek = today.getDate() - today.getDay();
    const lastDayOfWeek = firstDayOfWeek + 6;
    dateFilter = {
      $gte: new Date(today.setDate(firstDayOfWeek)),
      $lt: new Date(today.setDate(lastDayOfWeek)),
    };
  } else if (date === 'this month') {
    dateFilter = {
      $gte: new Date(today.getFullYear(), today.getMonth(), 1),
      $lt: new Date(today.getFullYear(), today.getMonth() + 1, 0),
    };
  }
  const statusFilter = status ? { status: status === 'true' } : {};
  const emailFilter = email
    ? { email: { $regex: new RegExp(email, 'i') } }
    : {};
  const nameFilter = name ? { name: { $regex: new RegExp(name, 'i') } } : {};
  const countDocuments = await ConsumerData.countDocuments({
    ...dateFilter,
    ...statusFilter,
    ...emailFilter,
    ...nameFilter,
  });

  return countDocuments;
};

const getConsumerDataById = async (id) => {
  const consumerData = await ConsumerData.findById(id);
  return consumerData;
};

module.exports = {
  getConsumerData,
  getCountDocuments,
  getConsumerDataById,
};
