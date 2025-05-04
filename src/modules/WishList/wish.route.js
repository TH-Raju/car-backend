import express from "express";
import { wishController } from "./wish.controller.js";

const wishRouter = express.Router();

wishRouter
  .get("/", wishController.getAllWishes)
  .post("/add", wishController.addWish)
  .delete("/:id", wishController.deleteWish)
  .get("/user/:userId", wishController.getUserWishes);

export default wishRouter;
