import express from "express";
import http from "http";
import WebSocket from "ws";

const app = express();
const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

app.get("/", (req, res) => {
  res.send("WebSocket server running...");
});

wss.on("connection", (socket) => {
  console.log("WebSocket connection established");

  socket.on("message", (message) => {
    console.log("message", message);
  });

  socket.off("close", () => {
    console.log("connection closed");
  });
});

server.listen(8080, () => {
  console.log("server running");
});
