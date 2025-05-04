import mongoose from "mongoose";
import Reviews from "./review.model.js";

const addReview = async (data) => {
  const result = await Reviews.create(data);
  return result;
};

const getAllReview = async () => {
  const reviews = await Reviews.find({}).populate("userId", "fullName photo");
  return reviews;
};

const getSingleReview = async (reviewId) => {
  const isValidReviewId = mongoose.Types.ObjectId.isValid(reviewId);
  if (!isValidReviewId) {
    return null;
  }

  const review = await Reviews.findById(reviewId);
  return review;
};

const updateReview = async (reviewId, reviewBody) => {
  const isValidObjectId = mongoose.Types.ObjectId.isValid(reviewId);
  if (!isValidObjectId) {
    return null;
  }

  const result = await Reviews.findByIdAndUpdate(reviewId, reviewBody, {
    new: true,
  });
  return result;
};

const deleteReview = async (reviewId) => {
  const isValidReviewId = mongoose.Types.ObjectId.isValid(reviewId);
  if (!isValidReviewId) {
    return null;
  }

  const review = await Reviews.findByIdAndDelete(reviewId);
  return review;
};

const getReviewsByProduct = async (productId) => {
  // console.log("from service", productId);
  const isValidProductId = mongoose.Types.ObjectId.isValid(productId);
  if (!isValidProductId) {
    return null;
  }
  try {
    const reviews = await Reviews.find({ productId }).populate(
      "userId",
      "fullName photo"
    );
    return reviews;
  } catch (error) {
    console.error("Error while finding reviews by product id:", error);
    throw error;
  }
};

export const reviewService = {
  addReview,
  getAllReview,
  getSingleReview,
  updateReview,
  deleteReview,
  getReviewsByProduct,
};
