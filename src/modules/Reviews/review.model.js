import { Schema, model } from "mongoose";

const reviewSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Products",
    },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    comment: {
      type: String,
    },
    rating: {
      type: Number,
    },
    forWeb: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Reviews = model("Reviews", reviewSchema);
export default Reviews;
