import mongoose from "mongoose";
import { User } from "./user.model.js";
import moment from "moment";

const addUser = async (userBody) => {
  const user = new User(userBody);
  const saveUser = await user.save();
  return saveUser;
};

const getAllUsers = async () => {
  const users = await User.find({ isDelete: "no" });
  return users;
};

const getSingleUser = async (userId) => {
  const isValidObjectId = mongoose.Types.ObjectId.isValid(userId);
  if (!isValidObjectId) {
    return null;
  }

  const user = await User.findById(userId);
  return user;
};

const updateUser = async (userId, userBody) => {
  const isValidObjectId = mongoose.Types.ObjectId.isValid(userId);
  if (!isValidObjectId) {
    return null;
  }

  const user = await User.findByIdAndUpdate(userId, userBody, {
    new: true,
  });
  return user;
};

const deleteUser = async (userId) => {
  const isValidObjectId = mongoose.Types.ObjectId.isValid(userId);
  if (!isValidObjectId) {
    return null;
  }

  const user = await User.findOneAndUpdate(
    { _id: userId },
    { isDelete: "yes" },
    { new: true }
  );
  // const user = await User.findByIdAndDelete(userId);
  return user;
};

const getUsersStatistics = async (query) => {
  const { year } = query;
  // console.log("query", query);

  const startDate = new Date(year, 0, 1);
  const endDate = new Date(year, 11, 31);

  try {
    // Aggregate to get users within the specified date range
    const result = await User.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          userAdd: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          month: "$_id.month",
          userAdd: 1,
        },
      },
    ]);

    // Initialize an array with all 12 months set to 0 users added
    const months = moment.months();
    const statistics = months.map((month, index) => ({
      day: moment().month(index).format("MMM"),
      monthly: 0,
    }));

    // Update the statistics array based on the aggregation results
    result.forEach((item) => {
      const monthIndex = item.month - 1; // Convert month number to zero-based index
      statistics[monthIndex].monthly = item.userAdd;
    });

    return statistics;
  } catch (error) {
    console.error("Error retrieving users:", error);
    throw error;
  }
};

export const userService = {
  addUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  getUsersStatistics,
};
