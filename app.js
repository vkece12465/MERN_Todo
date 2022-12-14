require("dotenv").config;
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const auth = require("./middlewares/auth");
const userRoute = require("./routes/user.route")
const todoRoute = require("./routes/todo.route")
const taskRoute = require("./routes/task.route")


// Database
const {dbConnection} = require("./config/dbConnection.config");
dbConnection();

// Middlewares
app.use(cookieParser());
app.use(cors({credentials: true}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Routers
app.use('/', auth, userRoute)
app.use('/', todoRoute)
app.use('/', taskRoute)

module.exports = app;