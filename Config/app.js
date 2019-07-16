const express = require('express');
var cors = require('cors');
const socketIO = require('../App/Controllers/Ws/socket');
const Mongodb = require('../App/Models/Mongodb/index');
require('dotenv').config();

global.Env = process.env;

const app = express();

app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
}));

app.use((req, res, next) => {
  console.log(`request at ${new Date()}`);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(Env.PORT, () => {
  console.log(`Server run at port: ${Env.PORT}`);
});

socketIO.run();
Mongodb.connect();

module.exports = app;
