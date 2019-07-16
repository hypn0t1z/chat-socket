const UserModel = require('../Models/Mongodb/UserModel');
const TokenModel = require('../Models/Mongodb/TokenModel');
const jwt = require('json-web-token');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const {ENCODE_KEY} = process.env;

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
  async register(req) {
    try {
      const { body } = req;
      const { USER_PASSWORD_SALT_ROUNDS: saltRounds = 10 } = process.env;
      const passwordHash = await bcrypt.hash(body.password, +saltRounds);

      const userMongo = new this.userModel({
        name: body.name,
        username: body.username,
        password: passwordHash
      })

      await userMongo.save(err => {
        if(err) {
          return {
            message: 'Register Failed',
            data: err
          }
        }
      })

      let result = await this.token(userMongo._id);
        if(!result) {
          return {
            message: 'Create token failed',
            data: null
          } 
        }
        return {
          message: 'Register success !',
          data: result.token
        }

    } catch (e) {
      console.log(e);
    }
  }

  async token(user_id) {
    let token = await jwt.encode(ENCODE_KEY, {
        id: user_id,
        timestamp: new Date().getTime()
    });
    let dataToken = '';
    let token_exist = await this.tokenModel.findOne({user_id}).exec();
    if(token_exist){
      dataToken = await token_exist.update({token: token.value});
    }
    else{
      dataToken = await this.tokenModel.create({
        token: token.value,
        user_id
      });
    }
    return dataToken;
  }
}

module.exports = new AuthService();
