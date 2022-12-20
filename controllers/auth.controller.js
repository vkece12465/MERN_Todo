const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const {SECRET_TOKEN} = process.env
const customError = require("../utils/customError")

// Create and export a Home page
exports.Home = (_req, res) => {
    res.send("/", "Welcome to World")
}
// Creating user
exports.userRegister = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        // Check the empty fields
        if(!(name && email && password)){
            throw new customError("Please fill all the fields", 400)
        }
    
        // Check the database if user already registerd or not
        const exitUser = await User.findOne({email});
        if(exitUser){
            throw new customError("User is already Registred", 400);
        }


        // Encrypting user password
        const encryptPassword = await bcrypt.hash(password, 10)


        // Create User
        const user = await User.create ({
            name,
            email: email.toLowerCase(),
            password: encryptPassword
        })
        const token = jwt.sign(
            {
            _id: user._id,
            email,
        },
        SECRET_TOKEN,
        {
            expiresIn: process.env.EXPIRY
        })
        user.token = token
        user.password = undefined;
        
        // Storing the user variables
        const createUser = user
    
        // Token
        
        // User not found message
        if(!createUser){
            throw new customError("User not found", 401);
        }
        res.status(200).json({
            success: true,
            message: `Hello ${name} your account created Succefully`
        })
    } catch (err) {
        console.log(err);
        res.status(400).json({
            success: false,
            message: "Account creation failed"
        })
    }
}

// Signin Feature
exports.signIn = async (req, res) => {
    try {
        // details collecting from the model
        const {email, password} = req.body;

        // Check email fields empty
        if(!(email && password)){
            res.status(400).json({
                success: false,
                message: "email and password are required"
            })
            return;
        }
        // Check the DB user login with email
        const user = await User.findOne({email});

        // Check the valid credentials
        if(user && (await bcrypt.compare(password, user.password))){
            // Create a token for Login
        const token = jwt.sign(
            {
            _id: user._id,
            email,
        },
        SECRET_TOKEN,
        {
            expiresIn: process.env.EXPIRY
        })
        user.token = token
        user.password = undefined;
        }

    
        // Set cookie for Log in
        res.cookie("token", token, {
            expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000) ,
            httpOnly: true,
            secure: true
        })
        res.status(200).json({
            success: true,
            message: "Signin Success"
        })


    // Error Block
    } catch (err) {
        console.log(err);
        throw new customError("Login failed", 400)
    }
}

// Logout Feature
exports.logOut = async (_req, res) => {
    try {
        // Simple Signout-  res.clearCookie(LoginUser)
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
            message: "Succefully Logged out"
        });

    } catch (err) {
        console.log(err);
        throw new customError("Logout failed", 400)
    }
    
}