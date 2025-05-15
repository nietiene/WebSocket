const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
 const io = new Server(server);

 app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('User connected:', socket.id)

    socket.on('chat message', (msg) => {
    console.log("Message received:", msg);
    io.emit("Chat message", msg);
      });

    socket.on('disconnect',() => {
    console.log("User disconnected:", socket.id);
     });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})