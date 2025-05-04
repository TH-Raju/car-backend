import sendResponse from "../../shared/sendResponse.js";
import Order from "../Orders/order.model.js";
import Products from "../Products/product.model.js";
import Shops from "../Shop/shop.model.js";
import { User } from "../User/user.model.js";

const getAllUsersLength = async () => {
  const users = (await User.find({})).length;
  return users;
};

const getAllOrdersLength = async () => {
  const orders = (await Order.find({})).length;
  return orders;
};

const getAllProductsLength = async () => {
  const products = (await Products.find({})).length;
  return products;
};
const getAllShopsLength = async () => {
  const shops = (await Shops.find({})).length;
  return shops;
};

export const lengthService = {
  getAllUsersLength,
  getAllOrdersLength,
  getAllProductsLength,
  getAllShopsLength,
};
