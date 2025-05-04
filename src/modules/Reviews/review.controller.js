import catchAsync from "../../shared/catchAsync.js";
import sendResponse from "../../shared/sendResponse.js";
import { reviewService } from "./review.service.js";

const addReview = catchAsync(async (req, res) => {
  const reviewData = req.body;
  const review = await reviewService.addReview(reviewData);

  if (review) {
    sendResponse(res, 200, "Review added successfully", review);
  } else {
    sendResponse(res, 400, "Failed to add review", {});
  }
});

const getAllReviews = catchAsync(async (req, res) => {
  const reviews = await reviewService.getAllReview();

  if (reviews) {
    sendResponse(res, 200, true, "Reviews Found", reviews);
  } else {
    sendResponse(res, 404, false, "No reviews found", {});
  }
});

const getSingleReview = catchAsync(async (req, res) => {
  const { id } = req.params;
  const review = await reviewService.getSingleReview(id);

  if (review) {
    sendResponse(res, 200, true, "Review Found", review);
  } else {
    sendResponse(res, 404, false, "No review found", {});
  }
});

const updateReview = catchAsync(async (req, res) => {
  const { id } = req.params;
  const reviewData = req.body;
  const review = await reviewService.updateReview(id, reviewData);
  if (review) {
    sendResponse(res, 200, true, "Review Update successfully", review);
  } else {
    sendResponse(res, 404, false, "Something went wrong", {});
  }
});

const deleteReview = catchAsync(async (req, res) => {
  const { id } = req.params;
  const review = await reviewService.deleteReview(id);

  if (review) {
    sendResponse(res, 200, true, "Review deleted successfully", review);
  } else {
    sendResponse(res, 404, false, "Something went wrong", {});
  }
});

const getAllReviewsByProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  const reviews = await reviewService.getReviewsByProduct(id);
  if (reviews) {
    sendResponse(res, 200, true, "Reviews Found", reviews);
  } else {
    sendResponse(res, 404, false, "No reviews found", {});
  }
});

export const reviewController = {
  addReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
  getAllReviewsByProduct,
};
