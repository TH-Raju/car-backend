import catchAsync from "../../shared/catchAsync.js";
import sendResponse from "../../shared/sendResponse.js";
import { categoryService } from "./categories.service.js";

const addCategory = catchAsync(async (req, res) => {
  const categoryData = req.body;
  const category = await categoryService.addCategory(categoryData);
  if (category) {
    sendResponse(res, 200, true, "Category added successfully", category);
  } else {
    sendResponse(res, 400, false, "Something went wrong", {});
  }
});

const getAllCategories = catchAsync(async (req, res) => {
  const categories = await categoryService.getAllCategories();
  if (categories) {
    sendResponse(res, 200, true, "Categories Found", categories);
  } else {
    sendResponse(res, 404, false, "No categories found", {});
  }
});

const getSingleCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const category = await categoryService.getSingleCategory(id);
  if (category) {
    sendResponse(res, 200, true, "Category Found", category);
  } else {
    sendResponse(res, 404, false, "No category found", {});
  }
});

const updateCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const categoryData = req.body;
  const category = await categoryService.updateCategory(id, categoryData);
  if (category) {
    sendResponse(res, 200, true, "Category updated successfully", category);
  } else {
    sendResponse(res, 404, false, "Something went wrong", {});
  }
});

const deleteCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const category = await categoryService.deleteCategory(id);
  if (category) {
    sendResponse(res, 200, true, "Category deleted successfully", category);
  } else {
    sendResponse(res, 404, false, "Something went wrong", {});
  }
});

export const categoryController = {
  addCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
