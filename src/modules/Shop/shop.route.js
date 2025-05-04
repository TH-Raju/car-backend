import express from "express";
import { shopController } from "./shop.controller.js";
import { USER_ROLE } from "../../helpers/userRole.js";
import { auth } from "../../middlewares/auth.js";
import fileUpload from "../../middlewares/fileUpload.js";
const upload = fileUpload("./src/uploads/shop/");
const shopRouter = express.Router();

shopRouter
  .get("/", shopController.getAllShops)
  .get("/:id", shopController.getSingleShop)
  .put(
    "/:id",
    upload.single("photo"),
    auth.verifyRole(USER_ROLE.VENDOR, USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
    shopController.updateShop
  )
  .delete(
    "/:id",
    auth.verifyRole(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
    shopController.deleteShop
  )
  .post(
    "/add",
    upload.single("photo"),
    auth.verifyRole(USER_ROLE.VENDOR, USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
    shopController.addShop
  );

export default shopRouter;
