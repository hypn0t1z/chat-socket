const Model = require('./Model');

class TokenModel extends Model {
  constructor() {
    super();
  }

  static get tableName() {
    return 'tokens';
  }
}

module.exports = TokenModel;
