const jwt = require('jwt-simple');
const mongoose = require("mongoose");
const User = mongoose.model("User");

function tokenForUser(user){
    const timeStamp = new Date().getTime();
    return jwt.encode({sub: user.id, iat: timeStamp}, process.env.JWT_SECRET);
}

const signupUser = async user => {
    const { email, password, username, date_of_birth, image_url } = user;
    if(!email || !password){
        return {error : "You must provide email and password"};
    }
    try {
        const existingUser = await User.findOne({email});
        if(existingUser){
            return {error : "Email is in use"};
        }
        const newUser = await new User(user).save();
        return {token: tokenForUser(newUser), id: newUser.id, email, username, date_of_birth, image_url};
    } catch (error) {
        throw error;
    }
};

const signinUser = user =>{
    return {token: tokenForUser(user), ...user.toObject()};
};

module.exports= {
    signupUser,
    signinUser
}