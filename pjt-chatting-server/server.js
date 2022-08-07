const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const port = 4002;

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
});

io.on("connection", (socket) => {
  console.log(`connected: ${socket.id}`);

  socket.on("enter_room", (roomName) => {
    socket.join(roomName);
    socket.to(roomName).emit("hiMessage");
  });

  socket.on("send message", (item, realRoomName) => {
    socket
      .to(realRoomName)
      .to(item.receiver)
      .to(item.sender)
      .emit("receive message", {
        sender: item.sender,
        receiver: item.receiver,
        message: item.message,
        createdDate: item.createdDate,
      });
  });

  socket.on("disconnect", function () {
    console.log("user disconnected: ", socket.id);
  });
});

server.listen(port, () => console.log(`포트번호 : ${port}`));
