import express from "express";
import userRouter from "../modules/User/user.route.js";
import categoryRouter from "../modules/Categories/categories.route.js";
import productRouter from "../modules/Products/product.route.js";
import reviewRouter from "../modules/Reviews/review.route.js";
import shopRouter from "../modules/Shop/shop.route.js";
import orderRouter from "../modules/Orders/order.route.js";
import wishRouter from "../modules/WishList/wish.route.js";
import lengthRouter from "../modules/Length/length.route.js";
import contactRouter from "../modules/Contact/contact.route.js";
import employeeRouter from "../modules/employee/employee.router.js";
import settingsRouter from "../modules/Settings/settings.route.js";
import notificationRouter from "../modules/Notification/notification.route.js";

const rootRouter = express.Router();

const moduleRoutes = [
  { path: "/users", router: userRouter },
  {
    path: "/category",
    router: categoryRouter,
  },
  {
    path: "/product",
    router: productRouter,
  },
  {
    path: "/review",
    router: reviewRouter,
  },
  {
    path: "/shop",
    router: shopRouter,
  },
  {
    path: "/order",
    router: orderRouter,
  },
  {
    path: "/wish",
    router: wishRouter,
  },
  {
    path: "/length",
    router: lengthRouter,
  },
  {
    path: "/contact",
    router: contactRouter,
  },
  {
    path: "/employee",
    router: employeeRouter,
  },
  {
    path: "/settings",
    router: settingsRouter,
  },
  {
    path: "/notification",
    router: notificationRouter,
  },
];

moduleRoutes.forEach((route) => {
  rootRouter.use(route.path, route.router);
});

export default rootRouter;
