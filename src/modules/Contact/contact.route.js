import express from "express";
import { contactController } from "./contact.controller.js";

const contactRouter = express.Router();

contactRouter.post("/add", contactController.sendContacts);

export default contactRouter;
