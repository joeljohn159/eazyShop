const jwt = require("jsonwebtoken");

const generateToken = (res, userId) => {
    const signedJWT = jwt.sign({userId}, process.env.JWT_SECRET,{expiresIn:'1d'});
    //set JWT for http only to increse secure data transfer
    res.cookie('jwt',signedJWT,{
        httpOnly: true,
        secure: process.env.NODE_ENV != 'development',
        sameSite: 'strict',
        maxAge:24*60*60*1000 //1day
    })
    res.joel = "test123"
}

module.exports = generateToken;