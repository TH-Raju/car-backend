import mongoose from "mongoose";
import Categories from "./categories.model.js";

const addCategory = async (data) => {
  const category = new Categories(data);
  const saveCategory = await category.save();
  return saveCategory;
};

const getAllCategories = async () => {
  const categories = await Categories.find({ isDelete: "no" });
  return categories;
};

const getSingleCategory = async (categoryId) => {
  const isValidCategoryId = mongoose.Types.ObjectId.isValid(categoryId);
  if (!isValidCategoryId) {
    return null;
  }

  const category = await Categories.findById(categoryId);
  return category;
};

const updateCategory = async (categoryId, categoryBody) => {
  const isValidObjectId = mongoose.Types.ObjectId.isValid(categoryId);
  if (!isValidObjectId) {
    return null;
  }

  const result = await Categories.findByIdAndUpdate(categoryId, categoryBody, {
    new: true,
  });
  return result;
};

const deleteCategory = async (categoryId) => {
  const isValidCategoryId = mongoose.Types.ObjectId.isValid(categoryId);
  if (!isValidCategoryId) {
    return null;
  }

  const category = await Categories.findOneAndUpdate(
    { _id: categoryId },
    { isDelete: "yes" },
    { new: true }
  );
  // const category = await Categories.findByIdAndDelete(categoryId);
  return category;
};

export const categoryService = {
  addCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
