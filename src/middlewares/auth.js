const jwt = require('jsonwebtoken');
const { app_secret } = require('../config.json');

module.exports = function (req,res,next) {
    let token = req.header('auth-header');
    if (!token) {
        return res.status(401).json({
            error:true,
            message:"User not authorized"          
        })
    }

    jwt.verify(token, app_secret,(err,userInfo)=>{
        if (err) {
            return next(err)
        }
    else{
            req.user = userInfo;       
            next();
        }
    });


}

