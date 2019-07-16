const express = require('express');
const socket = require('socket.io');
require('dotenv').config();

class SocketIO {
  constructor(){
    this.express = express();
  }

  run(){
    const {PORT_SOCKET} = process.env;
    const http = require('http').Server(this.express);

    http.listen(PORT_SOCKET, () => {
      console.log(`Socket run at port: ${PORT_SOCKET}`);
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
  }
}
module.exports = new SocketIO;