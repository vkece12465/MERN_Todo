const jwt = require("jsonwebtoken");
const User = require("./../models/user.model")
const {SECRET_TOKEN} = process.env;


const auth = (req, res, next) => {
    console.log(req.cookies);
    const {token} = req.cookies;

    // pure token

    /*
    Authorization: "Bearer long token"
    const token= req.header("Authorization").replace("bearer ", "") */

    // If no token
    if(!token){
        return res.status(403).json({
            success: false,
            message: "Please login..."
        })
    }

    // Verify token
    try {
        const tokenVerify = jwt.verify(token, SECRET_TOKEN)
        console.log(tokenVerify)
        req.user = tokenVerify

    } catch (error) {
        return res.status(403).json({
            success: false,
            message: "Invalid token"
        })

    }
    return next();
}

module.exports = auth;