require("dotenv").config;
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser")

// Middlewares
app.use(cookieParser());
app.use(cors({credentials: true}));
app.use(express.json());
app.use(express.urlencoded({extended: true}))