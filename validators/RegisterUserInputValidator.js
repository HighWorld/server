const { UserInputError } = require("apollo-server")

module.exports = (username, password, confirmPassword, email)=>{
    if(!username || !password || !confirmPassword || !email){
        throw new UserInputError("Various fields are empty");
    }

    if(password !== confirmPassword){
        throw new UserInputError("Please check your passwords");
    }

    if(password.length < 7){
        throw new UserInputError("Password too short")
    }

    if(!email.match(/\S+@\S+\.\S+/)){
        throw new UserInputError("Please enter valid email");
    }

    return true;
}