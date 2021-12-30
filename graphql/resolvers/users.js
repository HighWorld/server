require('dotenv').config()


const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { UserInputError } = require('apollo-server');
const RegisterUserInputValidator = require('../../validators/RegisterUserInputValidator');
const LoginUserInputValidator = require('../../validators/LoginUserInputValidator');


const generateToken = (user)=>{
    return jwt.sign({
        id: user._id,
        email: user.email,
        username: user.username
    },process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE});
};


module.exports = {
    Mutation:{
        async register(parent, 
            {registerInput:{username, email, password, confirmPassword}}){
            // Validate User-Data
            // Hash password
            // authenticate user
            if(RegisterUserInputValidator(username,password,confirmPassword,email)){
                password = await bcrypt.hash(password, 12);

                const newUser = new User({
                    email,
                    username,
                    password
                });
    
                const res = await newUser.save();
    
                const token = generateToken(res);
    
                return {
                    ...res._doc,
                    _id: res._id,
                    token
                }
            }
            
        },

        async login(parent, {username, password}){
            if(LoginUserInputValidator(username, password)){
                const user = await User.findOne({username});
                if(user){
                    const match = await bcrypt.compare(password, user.password);
                    if(match){
                        const token = generateToken(user);

                        return {
                            ...user._doc,
                            _id: user._id,
                            token
                        }
                    }
                    throw new UserInputError("Invalid Password or Username")
                }
                throw new UserInputError("Invalid Password or Username");
            }
        }


    }
}