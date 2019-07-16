
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
  async auth({ req, res, next }) {
    const header = req.headers['authorization'];
    const token = header.split(' ')[1];
    let check_token = await this.tokenModel.query().where({token, status: 1}).first();
    if(!check_token){
        return res.status(403).json({
            message: 'User not exist or this token has expired',
            data: null
        })
    }
    req.token = token;
    req.userId = check_token.user_id;
    next();
  }

  noAuth() {
    // TODO
  }

}

module.exports = new AuthMiddleware();
