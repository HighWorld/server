const { UserInputError } = require("apollo-server")

module.exports = (username, password)=>{
    if(!username || !password){
        throw new UserInputError("Various fields are empty");
    }

    return true;
}