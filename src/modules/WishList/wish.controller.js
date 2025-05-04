import catchAsync from "../../shared/catchAsync.js";
import sendResponse from "../../shared/sendResponse.js";
import Wishlist from "./wish.model.js";
import { wishService } from "./wish.service.js";

const addWish = catchAsync(async (req, res) => {
  const wishData = { ...req.body };
  const wishExist = await Wishlist.findOne({
    productId: wishData.productId,
    userId: wishData.userId,
  });

  if (wishExist) {
    return sendResponse(res, 406, false, "Already exists in the wishlist", {});
  }

  const wish = await wishService.addWish(wishData);
  if (wish) {
    sendResponse(res, 200, true, "Wish added successfully", wish);
  } else {
    sendResponse(res, 400, false, "Failed to add wish", {});
  }
});

const getAllWishes = catchAsync(async (req, res) => {
  const wishes = await wishService.getAllWish();

  if (wishes) {
    sendResponse(res, 200, true, "Wishes found", wishes);
  } else {
    sendResponse(res, 404, false, "No wishes found", {});
  }
});

const deleteWish = catchAsync(async (req, res) => {
  const { id } = req.params;
  const wish = await wishService.deleteWish(id);

  if (wish) {
    sendResponse(res, 200, true, "Wish deleted successfully", wish);
  } else {
    sendResponse(res, 404, false, "Something went wrong", {});
  }
});

const getUserWishes = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const wishes = await wishService.getUserWish(userId);

  if (wishes) {
    sendResponse(res, 200, true, "Wishes found", wishes);
  } else {
    sendResponse(res, 404, false, "No wishes found", {});
  }
});

export const wishController = {
  addWish,
  getAllWishes,
  deleteWish,
  getUserWishes,
};
