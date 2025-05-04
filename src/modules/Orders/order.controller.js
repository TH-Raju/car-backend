import catchAsync from "../../shared/catchAsync.js";
import sendResponse from "../../shared/sendResponse.js";
import { orderService } from "./order.service.js";

const addOrder = catchAsync(async (req, res) => {
  const orderRequest = req.body;
  const order = await orderService.addOrder(orderRequest);

  if (order) {
    sendResponse(res, 200, true, "Order added successfully", order);
  } else {
    sendResponse(res, 400, false, "Failed to add order", {});
  }
});

const getAllOrders = catchAsync(async (req, res) => {
  const orders = await orderService.getAllOrders();
  if (orders) {
    sendResponse(res, 200, true, "Orders Found", orders);
  } else {
    sendResponse(res, 404, false, "No orders found", {});
  }
});

const getSingleOrder = catchAsync(async (req, res) => {
  const { id } = req.params;
  const order = await orderService.getSingleOrder(id);

  if (order) {
    sendResponse(res, 200, true, "Order Found", order);
  } else {
    sendResponse(res, 404, false, "No order found", {});
  }
});

const updateOrder = catchAsync(async (req, res) => {
  const { id } = req.params;
  const orderRequest = req.body;
  orderRequest.serviceCost = Number(orderRequest.serviceCost);
  // console.log(orderRequest);
  const order = await orderService.updateOrder(id, orderRequest);

  if (order) {
    sendResponse(res, 200, true, "Order Update successfully", order);
  } else {
    sendResponse(res, 404, false, "Something went wrong", {});
  }
});

const deleteOrder = catchAsync(async (req, res) => {
  const { id } = req.params;
  const order = await orderService.deleteOrder(id);

  if (order) {
    sendResponse(res, 200, true, "Order deleted successfully", order);
  } else {
    sendResponse(res, 404, false, "Something went wrong", {});
  }
});

const getUserAllOrders = catchAsync(async (req, res) => {
  const { id } = req.params;
  const orders = await orderService.getUserOrders(id);
  if (orders) {
    sendResponse(res, 200, true, "Orders Found", orders);
  } else {
    sendResponse(res, 404, false, "No orders found", {});
  }
});

const ordersStatistics = catchAsync(async (req, res) => {
  const result = await orderService.getMonthlyOrderStatistics(req.query);
  sendResponse(res, 200, true, "Orders Statistics find successfully", result);
});

export const orderController = {
  addOrder,
  getAllOrders,
  getSingleOrder,
  getUserAllOrders,
  updateOrder,
  deleteOrder,
  ordersStatistics,
};
