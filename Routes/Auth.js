const express = require('express');
const router = express.Router();
const AuthController = require('../App/Controllers/Http/AuthController');
const { validationResult } = require('express-validator');
// Validators
const registerValidator = require('../App/Validators/registerValidator');

// Router register.
router.post('/register', registerValidator, (req, res) => {
  AuthController.register({ req, res });
});

// Router login.
router.post('/login', (req, res, next) => {
  // TODO: Logic login.
});

module.exports = router;
