import { Schema, model } from "mongoose";

const shopSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    shopName: {
      type: String,
      required: [true, "Shop Name is required"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    details: {
      type: String,
    },
    photo: {
      type: String,
    },
    workshop: {
      type: Array,
    },
    zipCode: {
      type: String,
    },
    specialties: {
      type: Array,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    description: {
      type: String,
    },
    openHours: {
      type: String,
    },
    offDay: {
      type: String,
    },
    onDay: {
      type: String,
    },
    location: {
      type: String,
    },
    facebook: {
      type: String,
    },
    instagram: {
      type: String,
    },
    website: {
      type: String,
    },
    isDelete: {
      type: String,
      default: "no",
    },
  },
  { timestamps: true }
);

shopSchema.pre(["find", "findOne"], function () {
  this.where({ isDelete: { $ne: "yes" } });
});

const Shops = model("Shops", shopSchema);
export default Shops;
