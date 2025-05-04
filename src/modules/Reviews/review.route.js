import express from "express";
import { reviewController } from "./review.controller.js";

const reviewRouter = express.Router();

reviewRouter
  .get("/", reviewController.getAllReviews)
  .get("/product/:id", reviewController.getAllReviewsByProduct)
  .get("/:id", reviewController.getSingleReview)
  .put("/:id", reviewController.updateReview)
  .delete("/:id", reviewController.deleteReview)
  .post("/add", reviewController.addReview);

export default reviewRouter;
