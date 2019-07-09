const UserModel = require('../Models/UserModel');
const TokenModel = require('../Models/TokenModel');
const jwt = require('json-web-token');

class AuthService {
  constructor() {
    this.userModel = UserModel;
    this.tokenModel = TokenModel;
  }

  /**
   * register function.
   * @param body
   * @returns {Promise<*>}
   */
  async register(body) {
    try {

      // Step 2
      if(!body.username || !body.password) {
        return {
          message: 'username_or_password_is_required',
          data: null
        }
      }

      // Step 3
      const user = await this.userModel.query()
        .where('username', body.username)
        .first();

      // Step 4
      if(user) {
        return {
          message: 'user_is_exist',
          data: null
        }
      }

      // Step 5
      // TODO
      const password = body.password;

      const dataInsert = {
        username: body.username,
        password,
        name: body.username
      };

      const userInserted = await this.userModel.query()
        .insert(dataInsert);

      let token = jwt.encode(Env.APP_KEY, {
        id: userInserted.id,
        timestamp: new Date().getTime()
      });

      const dataTokenInsert = {
        user_id: userInserted.id,
        token: token.value,
        status: 1
      };

      this.tokenModel.query().insert(dataTokenInsert);

      return {
        message: 'register_success',
        data: token.value
      };
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new AuthService();
