import catchAsync from "../../shared/catchAsync.js";
import sendResponse from "../../shared/sendResponse.js";
import { lengthService } from "./length.service.js";

const getTotalUserLength = catchAsync(async (req, res) => {
  const totalUsers = await lengthService.getAllUsersLength();
  sendResponse(res, 200, true, "Total users", totalUsers);
});

const getTotalOrderLength = catchAsync(async (req, res) => {
  const totalOrders = await lengthService.getAllOrdersLength();
  sendResponse(res, 200, true, "Total orders", totalOrders);
});

const getTotalProductLength = catchAsync(async (req, res) => {
  const totalProducts = await lengthService.getAllProductsLength();
  sendResponse(res, 200, true, "Total products", totalProducts);
});

const getTotalShopLength = catchAsync(async (req, res) => {
  const totalShops = await lengthService.getAllShopsLength();
  sendResponse(res, 200, true, "Total shops", totalShops);
});

export const lengthController = {
  getTotalUserLength,
  getTotalOrderLength,
  getTotalProductLength,
  getTotalShopLength,
};
