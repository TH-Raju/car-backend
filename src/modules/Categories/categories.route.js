import express from "express";
import { categoryController } from "./categories.controller.js";
import { auth } from "../../middlewares/auth.js";
import { USER_ROLE } from "../../helpers/userRole.js";

const categoryRouter = express.Router();

categoryRouter
  .get("/", categoryController.getAllCategories)
  .get("/:id", categoryController.getSingleCategory)
  .put(
    "/:id",
    auth.verifyRole(USER_ROLE.VENDOR, USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
    categoryController.updateCategory
  )
  .delete(
    "/:id",
    auth.verifyRole(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
    categoryController.deleteCategory
  )
  .post(
    "/add",
    // auth.verifyRole(USER_ROLE.VENDOR, USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
    categoryController.addCategory
  );

export default categoryRouter;
