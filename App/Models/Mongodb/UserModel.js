const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserModel = new Schema({
    id: Schema.Types.ObjectId,
    name: String,
    username: String,
    password: String,
    created: { 
       type: Date,
       default: Date.now
    }
});

module.exports = mongoose.model('User', UserModel );

