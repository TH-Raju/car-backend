import express from "express";
import { lengthController } from "./length.controller.js";
const lengthRouter = express.Router();

lengthRouter
  .get("/users", lengthController.getTotalUserLength)
  .get("/orders", lengthController.getTotalOrderLength)
  .get("/products", lengthController.getTotalProductLength)
  .get("/shops", lengthController.getTotalShopLength);

export default lengthRouter;
