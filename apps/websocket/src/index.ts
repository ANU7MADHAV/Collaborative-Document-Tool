import express from "express";
import http from "http";
import WebSocket from "ws";
import Redis from "ioredis";

const app = express();
const server = http.createServer(app);

const redis = new Redis({
  host: "localhost",
  port: 6379,
});

const QUEUE_NAME = "WebSocket_queue";

const wss = new WebSocket.Server({ server });

const publishQueue = async (message: any) => {
  try {
    await redis.lpush(QUEUE_NAME, JSON.stringify(message));
    console.log("Message published to Redis queue:", message);
  } catch (error) {
    console.log("error occured pushing into the queue");
  }
};

app.get("/", (req, res) => {
  res.send("WebSocket server running...");
});

wss.on("connection", (socket) => {
  console.log("WebSocket connection established");

  socket.on("message", (message) => {
    console.log("message", message.toString());
    publishQueue({
      timeStamp: new Date(),
      content: message.toString(),
    });
  });

  socket.off("close", () => {
    console.log("connection closed");
  });
});

redis.on("connection", () => {
  console.log("redis connection established");
});
redis.on("error", () => {
  console.log("error occured during connection");
});
server.listen(8080, () => {
  console.log("server running");
});
