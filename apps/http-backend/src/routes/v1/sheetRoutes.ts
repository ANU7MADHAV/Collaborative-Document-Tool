import express, { Request, Response } from "express";
import Redis from "ioredis";

const sheetRouter = express.Router();

const redis = new Redis({
  host: "localhost",
  port: 6379,
});

const QUEUE_NAME = "WebSocket_queue";

const processQueue = async () => {
  try {
    const message = await redis.rpop(QUEUE_NAME);
    if (message) {
      return message;
    }
  } catch (error) {
    console.log("error", error);
  }
};

sheetRouter.get("/sheets", async (req: Request, res: Response) => {});

sheetRouter.post("/sheets", async (req: Request, res: Response) => {
  const message = await processQueue();
  console.log("message", message);
});

sheetRouter.put("/sheets", async (req: Request, res: Response) => {});

sheetRouter.delete("sheets", async (req: Request, res: Response) => {});

export default sheetRouter;
