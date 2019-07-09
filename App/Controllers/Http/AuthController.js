const AuthService = require('../../Services/AuthService');

class AuthController {
  constructor() {
    this.authService = AuthService;
  }

  async register({ req, res, next }) {


    // Step 1
    const { body } = req;

    const result = this.authService.register(body);

    console.log(result);

    return res.json(result);
  }

  login() {

  }
}

module.exports = new AuthController();
