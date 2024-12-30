import express, { Request, Response } from "express";
import serverConfig from "./config/serverConfig";
import v1Router from "./routes/v1Routes";

const app = express();

app.use(express.json());

app.use("/api", v1Router);

app.listen(serverConfig.PORT, () => {
  console.log(`Server started at *${serverConfig.PORT}`);
});
