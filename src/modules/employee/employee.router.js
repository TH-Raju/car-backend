import express from "express";
import { USER_ROLE } from "../../helpers/userRole.js";
import { auth } from "../../middlewares/auth.js";
import { employeeController } from "./employee.controller.js";
import fileUpload from "../../middlewares/fileUpload.js";

const upload = fileUpload("./src/uploads/employee/");
const employeeRouter = express.Router();

employeeRouter
  .get("/", employeeController.getAllEmployees)
  .post("/add", upload.single("photo"), employeeController.addEmployee)
  .put("/update/:id", employeeController.updatesEmployee)
  .delete("/:id", employeeController.deleteEmployee);

export default employeeRouter;
