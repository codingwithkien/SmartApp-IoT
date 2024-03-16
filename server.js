const http = require("http");
const server = http.createServer();
const io = require("socket.io")(server);
const express = require("express");
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

let fanStatus = "Off";
let ledStatus = "Off";

io.on("connection", (socket) => {
  console.log("A user connected");
  socket.emit("fanStatus", fanStatus);
  socket.on("toggleFan", () => {
    fanStatus = fanStatus === "On" ? "Off" : "On";
    io.emit("fanStatus", fanStatus);
    console.log("Fan status:", fanStatus);
  });

  socket.emit("ledStatus", ledStatus);
  socket.on("toggleLed", () => {
    ledStatus = ledStatus === "On" ? "Off" : "On";
    io.emit("ledStatus", ledStatus);
    console.log("Led status:", ledStatus);
  });

  

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
