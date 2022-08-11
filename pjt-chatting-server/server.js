const express = require("express");
const fs = require("fs");
const https = require("https");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());

const port = 4002;

const privateKey = fs.readFileSync("privkey.pem", "utf-8");
const certificate = fs.readFileSync("cert.pem", "utf-8");
const ca = fs.readFileSync("chain.pem", "utf-8");

const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca,
};

const server = https.createServer(credentials, app);
const io = new Server(server, {
   //cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
	//cors: { origin: "https://awa24.site:443", methods: ["GET", "POST"] },
	cors: { origin: "*", methods: ["GET", "POST"] },
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
