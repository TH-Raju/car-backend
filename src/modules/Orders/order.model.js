import { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
    fullName: {
      type: String,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Products",
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
    },
    phone: {
      type: String,
    },
    brandName: {
      type: String,
    },
    modelName: {
      type: String,
    },
    modelYear: {
      type: String,
    },
    vehicleId: {
      type: String,
    },
    problem: {
      type: String,
    },
    startingDate: {
      type: Date,
    },
    startingTime: {
      type: String,
    },
    returnedDate: {
      type: Date,
    },
    returnedTime: {
      type: String,
    },
    productCost: {
      type: Number,
    },
    serviceCost: {
      type: Number,
    },
    orderType: {
      type: String,
      default: "service",
      enum: ["service", "product", "repair"],
    },
    orderStatus: {
      type: String,
      default: "pending",
      enum: ["pending", "accepted", "working", "rejected", "completed"],
    },
  },
  { timestamps: true }
);

const Order = model("Order", orderSchema);
export default Order;
