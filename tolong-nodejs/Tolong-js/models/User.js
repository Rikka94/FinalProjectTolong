const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: 4,
        maxlength: 30,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        match: [ /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Please provide valid email",],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: 6,
    },
    location: {
        type: String,
        required: [true, "Location is required"],
    },
    identificationNumber: {
        type: String,
        required: [true, "ID is required"],
        minlength: 4,
        unique: true,
    },

});

UserSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.createJWT = function() {
    return jwt.sign({userID: this._id, name: this.name},
        process.env.JWT_SECRET, {
            expiresIn: "30d"
        }    
    )
};

UserSchema.methods.getName = function () {
    return this.name;
};

UserSchema.methods.comparePassword = async function(candidatePassword) {
    

    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    
    return isMatch;
}

module.exports = mongoose.model("User", UserSchema);