const User = require("../models/User");
const {StatusCodes} = require("http-status-codes");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {

    const user = await User.create({...req.body});
    const token = user.createJWT(); 

    res.status(StatusCodes.CREATED).json({user: {name: user.getName()}, token});
};

const login = async(req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(StatusCodes.BAD_REQUEST).json({msg: "Please provide email and password"});
    }

    const user = await User.findOne({email});

    if(!user){
        return res.status(StatusCodes.UNAUTHORIZED).json({msg: "invalid credentials"})
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect){
        return res.status(StatusCodes.UNAUTHORIZED).json({msg: "Invalid Credentials"});
    }

    const token = user.createJWT();
    
    res.status(StatusCodes.OK).json({user: {name: user.name}, token});
};


module.exports = {
    register,
    login,
}