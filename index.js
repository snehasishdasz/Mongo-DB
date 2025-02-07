const express = require("express");
const mongoose = require("mongoose"); 
const app = express();

const {connectMongoDb} = require("./connection")
const userRouter = require("./routes/user")
const {logReqRes}  = require("./middlewares")

const port = 8000;

// Connect to MongoDB
connectMongoDb("mongodb://127.0.0.1:27017/mongo-db-01").then(()=>console.log("Connected to MongoDB"))




//**  Middleware - Plugin
app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
app.use(logReqRes("log.txt"));


app.use("/api/users", userRouter);


app.listen(port, () => console.log(`Server stated at ${port}`));    

