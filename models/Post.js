const {model, Schema} = require('mongoose');

const PostSchema = new Schema({
    body: String,
    username: String,
    comments: [
        {
            body: String,
            username: String,
            createdAt: {
                type: String,
                default: Date
            }
        }
    ],
    likes:[
        {
            username: String,
            createdAt: {
                type: String,
                default: Date
            }
        }
    ],
    user:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    createdAt: {
        type: String,
        default: Date
    }
});

module.exports = model('Post', PostSchema)