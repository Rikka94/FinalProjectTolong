const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
    problem: {
        type: String,
        required: [true, "Problems"],
        maxlength: 100,
    },
    status: {
        type: String,
        enum: ["pending", "interview", "declined"],
        default: "pending",
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "User id"],
    },
    createdbyUser: {
        type: String,
        ref: "User",
        required: [true, "Please prove a user name"]
    }
    },
    {
       timestamps: true, 
    }  
    
    );

module.exports = mongoose.model("Problem", ProblemSchema);