import express from "express";
import userRouter from "./v1/userRoutes";
import sheetRouter from "./v1/sheetRoutes";

const v1Router = express.Router();

v1Router.use("/v1/user", userRouter);
v1Router.use("/v1/", sheetRouter);

export default v1Router;
