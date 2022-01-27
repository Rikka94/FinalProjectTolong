const express = require("express");

const router = express.Router();



const { createProblems,
    getAllProblems,} = require('../controllers/problem')

router.route("/").post(createProblems);
router.route("/").get(getAllProblems);

module.exports = router;