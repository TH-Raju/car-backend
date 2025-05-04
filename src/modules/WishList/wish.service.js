import mongoose from "mongoose";
import Wishlist from "./wish.model.js";

const addWish = async (data) => {
  const result = await Wishlist.create(data);
  return result;
};

const getAllWish = async () => {
  const result = await Wishlist.find({}).populate(
    "userId",
    "fullName photo _id"
  );
  return result;
};

const deleteWish = async (wishId) => {
  const isValidWishId = mongoose.Types.ObjectId.isValid(wishId);
  if (!isValidWishId) {
    return null;
  }

  const result = await Wishlist.findOneAndDelete({ productId: wishId });
  return result;
};

const getUserWish = async (userId) => {
  // console.log("from service", categoryId);
  const isValidProductId = mongoose.Types.ObjectId.isValid(userId);
  if (!isValidProductId) {
    return null;
  }
  try {
    const result = await Wishlist.find({ userId }).populate({
      path: "productId",
      select: "photo name _id price userId",
      populate: {
        path: "userId",
        select: "fullName email",
      },
    });
    return result;
  } catch (error) {
    console.error("Error while finding Wish List by user id:", error);
    throw error;
  }
};

export const wishService = {
  addWish,
  getAllWish,
  deleteWish,
  getUserWish,
};
