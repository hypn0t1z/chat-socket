const express = require('express');
require('dotenv').config();

global.Env = process.env;

const app = express();

app.use((req, res, next) => {
  console.log(`request at ${new Date()}`);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const http = require('http').Server(app);

http.listen(Env.PORT, () => {
  console.log(`Server run at port: ${Env.PORT}`);
});

const io = require('socket.io')(http, {
  pingTimeout: 30000,
  pingInterval: 60000
});

let connected = [];
let countUser = 0;
io.on('connect', (socket) => {
  connected.push(socket.id);
  io.emit('client_connect', connected);
  
  socket.on('disconnect', (data) => {
    connected = connected.filter(conn => {
      return conn !== socket.id;
    });
    io.emit('client_disconnect', connected);
  });

  // Add new user
  socket.on('new-user', data => {
    countUser++;
    socket.nickname = data;
    io.emit('joined', {
      id: socket.id,
      nickname: data,
    });
  })

  socket.on('chat', (data) => {
    io.emit('chat', {
      id: socket.id,
      nickname: socket.nickname,
      message: data
    });
  })
});

module.exports = app;
