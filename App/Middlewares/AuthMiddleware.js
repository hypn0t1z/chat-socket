
const jwt = require('json-web-token');

class AuthMiddleware {
  constructor() {

  }

  /**
   * auth function.
   * @description: Middleware check authentication of user.
   * @param req Request
   * @param res Response
   * @param next Next function
   */
  auth({ req, res, next }) {
    const { headers } = req;
    const token = headers.authorization;

    // Check token is exist.
    if(!token) {
      return next({
        message: 'UnAuthorization',
        data: null
      });
    }

    const dataToken = jwt.decode(Env.APP_KEY, token);

    if(!dataToken.value) {
      return next({
        message: 'UnAuthorization',
        data: null
      });
    }

    req.user = dataToken.value;
    next();
  }

  noAuth() {
    // TODO
  }

}

module.exports = new AuthMiddleware();
