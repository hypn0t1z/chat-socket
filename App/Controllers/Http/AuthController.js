const AuthService = require('../../Services/AuthService');
const { validationResult } = require('express-validator');
class AuthController {
  constructor() {
    this.authService = AuthService;
  }

  async register({ req, res }) {
    const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let {msg} = errors.errors[0];
        return res.status(422).json({'message': msg, data: null});
      }
    const result = await this.authService.register(req);

    return res.json(result);
  }

  async login() {

  }
}

module.exports = new AuthController();
