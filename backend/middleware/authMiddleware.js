const jwt = require('jsonwebtoken');
const asyncHandler = require('../middleware/asyncHandler.js');
const User = require('../models/userModel.js');

//Protect routes

const protect = asyncHandler(async (req,res,next) => {
    let token;
    token = req.cookies.jwt;
    if(token){
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            next(); 
        }catch(error){
            console.log(error);
            res.status(401);
            throw new Error('Not Authorized, No token')
        }

    }else{
        console.log("PROTECT ERROR")
        res.status(401);
        throw new Error('Not Authorized, No token')
    }

})


// Admin Middleware

const admin = (req,res,next) => {
    if(req.user && req.user.isAdmin){
        next();
    }else{
        res.status(401);
        throw new Error('Not Authorized, No token')
    }
}


module.exports = {protect, admin};