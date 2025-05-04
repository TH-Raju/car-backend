import mongoose from "mongoose";
import Order from "./order.model.js";
import moment from "moment";

const addOrder = async (orderData) => {
  const savedOrder = await Order.create(orderData);
  return savedOrder;
};

const getAllOrders = async () => {
  const orders = await Order.find({}).populate(
    "productId",
    "name price photo userId categoryId"
  );
  return orders;
};

const getSingleOrder = async (orderId) => {
  const isValidOrderId = mongoose.Types.ObjectId.isValid(orderId);
  if (!isValidOrderId) {
    return null;
  }

  const order = await Order.findById(orderId).populate(
    "productId",
    "name price photo userId categoryId"
  );
  return order;
};

const updateOrder = async (orderId, updateData) => {
  const isValidObjectId = mongoose.Types.ObjectId.isValid(orderId);
  if (!isValidObjectId) {
    return null;
  }

  const updateResult = await Order.findByIdAndUpdate(orderId, updateData, {
    new: true,
  });

  return updateResult;
};

const deleteOrder = async (orderId) => {
  const isValidObjectId = mongoose.Types.ObjectId.isValid(orderId);
  if (!isValidObjectId) {
    return null;
  }

  const deleteResult = await Order.findByIdAndDelete(orderId);
  return deleteResult;
};

const getUserOrders = async (userId) => {
  // console.log("from service", categoryId);
  const isValidProductId = mongoose.Types.ObjectId.isValid(userId);
  if (!isValidProductId) {
    return null;
  }
  try {
    const orders = await Order.find({ userId }).populate({
      path: "productId",
      select: "photo name _id price userId",
      populate: {
        path: "userId",
        select: "fullName email",
      },
    });
    return orders;
  } catch (error) {
    console.error("Error while finding products by category id:", error);
    throw error;
  }
};

const getMonthlyOrderStatistics = async (query) => {
  const { year } = query;
  // console.log("query", query);

  const startDate = new Date(year, 0, 1); // January 1st of the specified year
  const endDate = new Date(year, 11, 31); // December 31st of the specified year

  try {
    // Aggregate to get orders within the specified date range and populate productId
    const result = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $lookup: {
          from: "products", // collection name in the database
          localField: "productId",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: "$product", // deconstruct the product array
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          totalIncome: { $sum: "$product.price" },
        },
      },
      {
        $project: {
          _id: 0,
          month: "$_id.month",
          totalIncome: 1,
        },
      },
    ]);

    // Initialize an array with all 12 months set to 0 income
    const months = moment.months();
    const statistics = months.map((month, index) => ({
      day: moment().month(index).format("MMM"),
      income: 0,
    }));

    // Update the statistics array based on the aggregation results
    result.forEach((item) => {
      const monthIndex = item.month - 1; // Convert month number to zero-based index
      statistics[monthIndex].income = item.totalIncome;
    });

    return statistics;
  } catch (error) {
    console.error("Error retrieving orders:", error);
    throw error;
  }
};

export const orderService = {
  addOrder,
  getAllOrders,
  getSingleOrder,
  getUserOrders,
  updateOrder,
  deleteOrder,
  getMonthlyOrderStatistics,
};
