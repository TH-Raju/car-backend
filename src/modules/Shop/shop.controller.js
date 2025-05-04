import catchAsync from "../../shared/catchAsync.js";
import sendResponse from "../../shared/sendResponse.js";
import { shopService } from "./shop.service.js";

const addShop = catchAsync(async (req, res) => {
  const shopData = { ...req.body };

  if (
    typeof shopData.workshop === "string" &&
    typeof shopData.specialties === "string"
  ) {
    shopData.workshop = shopData.workshop.split(",").map((item) => item.trim());
    shopData.specialties = shopData.specialties
      .split(",")
      .map((item) => item.trim());
  }

  if (req.file) {
    const fileName = req.file.filename;
    shopData.photo = `/uploads/shop/${fileName}`;
  }

  const shop = await shopService.addShop(shopData);
  if (shop) {
    sendResponse(res, 200, true, "Shop added successfully", shop);
  } else {
    sendResponse(res, 400, false, "Something went wrong", {});
  }
});

const getAllShops = catchAsync(async (req, res) => {
  const shops = await shopService.getAllShops();
  if (shops) {
    sendResponse(res, 200, true, "Shops Found", shops);
  } else {
    sendResponse(res, 404, false, "No shops found", {});
  }
});

const getSingleShop = catchAsync(async (req, res) => {
  const { id } = req.params;
  const shop = await shopService.getSingleShop(id);
  if (shop) {
    sendResponse(res, 200, true, "Shop Found", shop);
  } else {
    sendResponse(res, 404, false, "No shop found", {});
  }
});

const updateShop = catchAsync(async (req, res) => {
  const { id } = req.params;
  const shopData = { ...req.body };
  if (
    typeof shopData.workshop === "string" &&
    typeof shopData.specialties === "string"
  ) {
    shopData.workshop = shopData.workshop.split(",").map((item) => item.trim());
    shopData.specialties = shopData.specialties
      .split(",")
      .map((item) => item.trim());
  }

  if (req.file) {
    const fileName = req.file.filename;
    shopData.photo = `/uploads/shop/${fileName}`;
  }

  const shop = await shopService.updateShop(id, shopData);
  if (shop) {
    sendResponse(res, 200, true, "Shop updated successfully", shop);
  } else {
    sendResponse(res, 404, false, "Something went wrong", {});
  }
});

const deleteShop = catchAsync(async (req, res) => {
  const { id } = req.params;
  const shop = await shopService.deleteShop(id);
  if (shop) {
    sendResponse(res, 200, true, "Shop deleted successfully", shop);
  } else {
    sendResponse(res, 404, false, "Something went wrong", {});
  }
});

export const shopController = {
  addShop,
  getAllShops,
  getSingleShop,
  updateShop,
  deleteShop,
};
