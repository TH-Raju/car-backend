import { Schema, model } from "mongoose";

const notificationSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Products",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    orderId: {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Categories",
    },
    message: {
      type: String,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Notification = model("Notification", notificationSchema);
export default Notification;
