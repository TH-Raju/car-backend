import { Schema, model } from "mongoose";

const wishSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      required: [true, "productId is required"],
      ref: "Products",
    },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Wishlist = model("WishList", wishSchema);
export default Wishlist;
