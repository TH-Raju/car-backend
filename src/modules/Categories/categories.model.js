import mongoose, { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    isDelete: {
      type: String,
      default: "no",
    },
  },
  { timestamps: true }
);

const Categories = model("Categories", categorySchema);
export default Categories;
