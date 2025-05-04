import express from "express";
import { productController } from "./product.controller.js";
import { auth } from "../../middlewares/auth.js";
import { USER_ROLE } from "../../helpers/userRole.js";
import fileUpload from "../../middlewares/fileUpload.js";

const upload = fileUpload("./src/uploads/products/");
const productRouter = express.Router();

productRouter
  .get("/", productController.getAllProducts)
  .get("/search", productController.getAllSearchProducts)
  .get("/unique/product", productController.getUniqueProductName)
  .get("/filter/unique/:name", productController.getAllProductsByName)
  .get("/by/category/all/:id", productController.getAllProductsByCategory)
  .get("/:id", productController.getSingleProduct)
  .put(
    "/:id",
    upload.single("photo"),
    auth.verifyRole(USER_ROLE.VENDOR, USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
    productController.updateProduct
  )
  .delete(
    "/:id",
    auth.verifyRole(USER_ROLE.VENDOR, USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
    productController.deleteProduct
  )
  .post(
    "/add",
    upload.single("photo"),
    auth.verifyRole(USER_ROLE.VENDOR, USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
    productController.addProduct
  );

export default productRouter;
