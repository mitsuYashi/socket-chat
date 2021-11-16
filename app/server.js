const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

let store = {};

app.use(express.static('public'));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/chat", (req, res) => {
  res.sendFile(__dirname + "/public/chat.html");
});

io.on("connection", (socket) => {
  socket.on("join", (msg) => {
    usrobj = {
      'room': msg.roomId,
      'name': msg.name
    }
    store = usrobj;
    socket.join(msg.roomId);
  })

  socket.on("post", (msg) => {
    io.to(store.room).emit("message", msg);
  });
});

http.listen(3000, () => {
    console.log("success listen 3000");
})