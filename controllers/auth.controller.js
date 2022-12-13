const User = require("../models/user.model");
const crypto = require("crypto");
const JWT = require("jsonwebtoken");
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