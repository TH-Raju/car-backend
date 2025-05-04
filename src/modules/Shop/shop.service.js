import mongoose from "mongoose";
import Shops from "./shop.model.js";

const addShop = async (data) => {
  const saveShop = await Shops.create(data);
  return saveShop;
};

const getAllShops = async () => {
  const shops = await Shops.find({ isDelete: "no" });
  return shops;
};

const getSingleShop = async (shopId) => {
  const isValidShopId = mongoose.Types.ObjectId.isValid(shopId);
  if (!isValidShopId) {
    return null;
  }

  const shop = await Shops.findById(shopId);
  return shop;
};

const updateShop = async (shopId, shopBody) => {
  const isValidObjectId = mongoose.Types.ObjectId.isValid(shopId);
  if (!isValidObjectId) {
    return null;
  }

  const result = await Shops.findByIdAndUpdate(shopId, shopBody, {
    new: true,
  });
  return result;
};

const deleteShop = async (shopId) => {
  const isValidShopId = mongoose.Types.ObjectId.isValid(shopId);
  if (!isValidShopId) {
    return null;
  }

  const shop = await Shops.findOneAndUpdate(
    { _id: shopId },
    { isDelete: "yes" },
    { new: true }
  );
  // const shop = await Shops.findByIdAndDelete(shopId);
  return shop;
};

export const shopService = {
  addShop,
  getAllShops,
  getSingleShop,
  updateShop,
  deleteShop,
};
