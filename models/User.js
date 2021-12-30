const {model, Schema} = require('mongoose');

const UserSchema = new Schema({
    username: {
        type:String,
        unique:true,
        required: true
    },
    password: {
        type:String,
        minlength: 7,
        required: true
    },
    email: {
        type:String,
        required: true
    },
},{
    timestamps: true
});

module.exports = new model('User', UserSchema);