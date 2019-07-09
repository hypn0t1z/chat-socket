const express = require('express');
const AuthMiddleware = require('../App/Middlewares/AuthMiddleware');

const router = express.Router();

router.use((req, res, next) => {
  AuthMiddleware.auth({ req, res, next });
});

router.get('/', (req, res, next) => {
  // TODO
});

module.exports = router;
