require("dotenv").config();

const express = require("express");
const app = express ();

const connectDB = require("./db/connect");
const cors = require("cors");

const authenticateUser = require("./middleware/authentication");

const authRouter = require("./routes/authenticate");
const problemsRouter = require("./routes/problems");

app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/problems", problemsRouter);


const start = async() => {
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(process.env.PORT, () => {
            console.log("Server is listening on port 5000");
        })

    }catch(error){
        console.log(error)
    }
};

start ();