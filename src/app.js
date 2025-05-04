import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import rootRouter from "./routes/index.js";
import globalErrorHandler from "./middlewares/errorHandler.js";
import sendResponse from "./shared/sendResponse.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
// Enable CORS

app.use(express.static("src"));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    optionsSuccessStatus: 200,
  })
);

app.use(globalErrorHandler);
app.use("/api/v1", rootRouter);

app.get("/", (req, res) => {
  res.send("Server is working! YaY!");
});

app.all("*", (req, res) => {
  sendResponse(res, 404, false, "No Route Found.", {});
});

export default app;
