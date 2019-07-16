const UserModel = require('./UserModel');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContentModel = new Schema({
    id: Schema.Types.ObjectId,
    user_id: { 
       type: Schema.Types.ObjectId, 
       ref: 'Users'
    },
    content: Text,
    created: { 
       type: Date,
       default: Date.now
    }
});

module.exports = mongoose.model('Contents', ContentModel );