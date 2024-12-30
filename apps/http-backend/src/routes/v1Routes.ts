import express from "express";
import userRouter from "./v1/userRoutes";

const v1Router = express.Router();

v1Router.use("/v1/user", userRouter);

export default v1Router;
