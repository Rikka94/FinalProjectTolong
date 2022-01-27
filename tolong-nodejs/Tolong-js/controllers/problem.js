const Problem = require("../models/Problem");

const createProblems = async (req, res) => {
    try {
        req.body.createdBy = req.user.userId;
        req.body.createdByUser = req.user.name;

        const job = await Job.create(req.body);
        res.status(200).json({job});
    } catch (error){
        res.status(500).send(error);
    }

    res.status(200).json({msg: "Please Add Jobs"});
}

const getAllProblems = async (req, res) => {
    try{
        const jobs = await Job.find({createdBy: req.user.userId});
        res.status(200).json({jobs, count: jobs.length});
    }catch(error) {
        res.status(500).send(error);
    }
    
}


module.exports = {
    createProblems,
    getAllProblems,
}