const User = require("../models/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const {SALT_PASSWORD, SECRET_TOKEN} = process.env
const customError = require("../utils/customError")

// Encrypting user password
const encryptPassword = (password) => {
    const hmac = crypto.createHmac("sha256", SALT_PASSWORD);
    return hmac.update(password).digest("hex");
};

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
    
        // Create User
        const user = {
            name,
            email,
            password: encryptPassword(password)
        }
        // Storing the user variables
        const createUser = await User.create(user)
    
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
        // details collicting from the model
        const {email, password} = req.body;

        // Check the DB user login with email
        const user = await User.findOne({email});

        // Check the invalid credentials
        if(!(email && user.password === encryptPassword(password))){
            res.status(400).json({
                error: "Invalid email and password"
            })
        }

        // Create a token for Login
        const token = jwt.sign(
            {
            _id: user._id,
            email,
        },
        SECRET_TOKEN,
        {
            expiresIn: "24hr"
        })
        user.token = token
        user.password = undefined;

        res.cookie("LoginUser", token, {
            expires: new Date.now() + 1 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        })
        res.status(200).json({
            success: true,
            message: "Login Success"
        })


    // Error Block
    } catch (err) {
        console.log(err);
        throw new customError("Login failed", 401)
    }
}

