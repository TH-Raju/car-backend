import mongoose, { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Categories",
    },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    name: {
      type: String,
    },
    detail: {
      type: String,
    },
    photo: {
      type: String,
      default: "/uploads/profile/default-user.jpg",
    },
    price: {
      type: Number,
    },
    highlight: {
      type: Array,
    },
    discount: {
      type: Number,
      default: 0,
    },
    isDelete: {
      type: String,
      default: "no",
    },
  },
  { timestamps: true }
);

productSchema.pre(["find", "findOne"], function () {
  this.where({ isDelete: { $ne: "yes" } });
});

const Products = model("Products", productSchema);
export default Products;
