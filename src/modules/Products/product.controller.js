import catchAsync from "../../shared/catchAsync.js";
import sendResponse from "../../shared/sendResponse.js";
import { productService } from "./product.service.js";

const addProduct = catchAsync(async (req, res) => {
  const productData = { ...req.body };

  productData.price = Number(productData.price);

  if (productData.discount) {
    productData.discount = Number(productData.discount);
  }

  if (typeof productData.highlight === "string") {
    productData.highlight = productData.highlight
      .split(",")
      .map((item) => item.trim());
  }

  if (req.file) {
    const fileName = req.file.filename;
    productData.photo = `/uploads/products/${fileName}`;
  }
  // console.log(productData);

  const product = await productService.addProduct(productData);
  if (product) {
    sendResponse(res, 200, true, "Product added successfully", product);
  } else {
    sendResponse(res, 400, false, "Something went wrong", {});
  }
});

const getAllProducts = catchAsync(async (req, res) => {
  const products = await productService.getAllProducts();
  if (products) {
    sendResponse(res, 200, true, "Products found", products);
  } else {
    sendResponse(res, 404, false, "No products found", {});
  }
});

const getSingleProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const product = await productService.getSingleProduct(id);
  if (product) {
    sendResponse(res, 200, true, "Product found", product);
  } else {
    sendResponse(res, 404, false, "Product not found", {});
  }
});

const updateProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const productData = { ...req.body };
  if (req.file) {
    productData.photo = req.file.path;
  }
  const updatedProduct = await productService.updateProduct(id, productData);
  if (updatedProduct) {
    sendResponse(
      res,
      200,
      true,
      "Product updated successfully",
      updatedProduct
    );
  } else {
    sendResponse(res, 404, false, "Product not found or update failed", {});
  }
});

const deleteProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await productService.deleteProduct(id);
  if (deletedProduct) {
    sendResponse(
      res,
      200,
      true,
      "Product deleted successfully",
      deletedProduct
    );
  } else {
    sendResponse(res, 404, false, "Product not found or delete failed", {});
  }
});

const getUniqueProductName = catchAsync(async (req, res) => {
  const products = await productService.getUniqueProductNames();
  // console.log("Raju", products);
  if (products) {
    sendResponse(res, 200, true, "Products found", products);
  } else {
    sendResponse(res, 404, false, "No products found", {});
  }
});

const getAllProductsByName = catchAsync(async (req, res) => {
  const { name } = req.params;
  const products = await productService.getProductsByName(name);
  if (products) {
    sendResponse(res, 200, true, "Products found", products);
  } else {
    sendResponse(res, 404, false, "No products found", {});
  }
});

const getAllProductsByCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const products = await productService.getProductsByCategory(id);
  // console.log("The Id", id);
  if (products) {
    sendResponse(res, 200, true, "Products found", products);
  } else {
    sendResponse(res, 404, false, "No products found", {});
  }
});

const getAllSearchProducts = catchAsync(async (req, res) => {
  const { name, ...otherQueryParams } = req.query;
  const products = await productService.getSearchProducts({
    name,
    ...otherQueryParams,
  });
  if (products) {
    sendResponse(res, 200, true, "Products found", products);
  } else {
    sendResponse(res, 404, false, "No products found", {});
  }
});

export const productController = {
  addProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  getUniqueProductName,
  getAllProductsByCategory,
  getAllProductsByName,
  getAllSearchProducts,
};
