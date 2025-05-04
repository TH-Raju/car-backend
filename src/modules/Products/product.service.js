import mongoose from "mongoose";
import Product from "./product.model.js";

const addProduct = async (data) => {
  const product = new Product(data);
  const saveProduct = await product.save();
  return saveProduct;
};

const getAllProducts = async () => {
  const products = await Product.find({ isDelete: "no" }).populate(
    "userId",
    "_id role photo fullName phone email"
  );
  return products;
};

const getSingleProduct = async (productId) => {
  const isValidProductId = mongoose.Types.ObjectId.isValid(productId);
  if (!isValidProductId) {
    return null;
  }

  const product = await Product.findById(productId);
  return product;
};

const updateProduct = async (productId, productBody) => {
  const isValidObjectId = mongoose.Types.ObjectId.isValid(productId);
  if (!isValidObjectId) {
    return null;
  }

  const result = await Product.findByIdAndUpdate(productId, productBody, {
    new: true,
  });
  return result;
};

const deleteProduct = async (productId) => {
  const isValidProductId = mongoose.Types.ObjectId.isValid(productId);
  if (!isValidProductId) {
    return null;
  }

  const product = await Product.findOneAndUpdate(
    { _id: productId },
    { isDelete: "yes" },
    { new: true }
  );

  // const product = await Product.findByIdAndDelete(productId);
  return product;
};

const getUniqueProductNames = async () => {
  try {
    const uniqueProductNames = await Product.aggregate([
      { $group: { _id: "$name" } },
      { $project: { _id: 0, name: "$_id" } },
    ]);
    return uniqueProductNames.map((product) => product.name);
  } catch (error) {
    console.error("Error while getting unique product names:", error);
    throw error;
  }
};

const getProductsByName = async (name) => {
  try {
    const products = await Product.find({ name });
    return products;
  } catch (error) {
    console.error("Error while finding products by name:", error);
    throw error;
  }
};

const getProductsByCategory = async (categoryId) => {
  // console.log("from service", categoryId);
  const isValidProductId = mongoose.Types.ObjectId.isValid(categoryId);
  if (!isValidProductId) {
    return null;
  }
  try {
    const products = await Product.find({ userId: categoryId }).populate(
      "userId",
      "_id role photo fullName phone email"
    );
    return products;
  } catch (error) {
    console.error("Error while finding products by category id:", error);
    throw error;
  }
};

const getSearchProducts = async (query) => {
  try {
    const { name, ...otherFilters } = query;
    const filter = { ...otherFilters };

    if (name) {
      filter.name = { $regex: name, $options: "i" }; // Case-insensitive regex match
    }

    // Add a $match stage to exclude documents with isDelete: "yes"
    const aggregationPipeline = [
      {
        $match: {
          ...filter,
          isDelete: { $ne: "yes" }, // Exclude documents with isDelete: "yes"
        },
      },
      // Optionally add more aggregation stages based on your requirements
    ];

    const products = await Product.aggregate(aggregationPipeline);
    return products;
  } catch (error) {
    console.error("Error while searching for products:", error);
    return null;
  }
};

export const productService = {
  addProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  getUniqueProductNames,
  getProductsByName,
  getProductsByCategory,
  getSearchProducts,
};
