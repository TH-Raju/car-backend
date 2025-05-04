import express from "express";
import { orderController } from "./order.controller.js";
import { USER_ROLE } from "../../helpers/userRole.js";
import { auth } from "../../middlewares/auth.js";

const orderRouter = express.Router();

orderRouter
  .get(
    "/",
    auth.verifyRole(USER_ROLE.VENDOR, USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
    orderController.getAllOrders
  )
  .get("/all/:id", orderController.getUserAllOrders)
  .get("/all/order/statistics", orderController.ordersStatistics)
  .get("/:id", orderController.getSingleOrder)
  .put(
    "/:id",
    auth.verifyRole(USER_ROLE.VENDOR, USER_ROLE.ADMIN),
    orderController.updateOrder
  )
  .post("/add", orderController.addOrder)
  .delete(
    "/:id",
    auth.verifyRole(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
    orderController.deleteOrder
  );

export default orderRouter;
