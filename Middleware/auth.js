const User = require("../Model/userModel");
const jwt = require("jsonwebtoken");
const  ErrorHandler  = require("../utils/Errorhandler");
const { CatchAsyncError } =require("../Middleware/CatchAsyncError");


exports.isAuthenticated = CatchAsyncError(async (req,res,next) =>{
    
        const {token} = req.cookies;
    if(!token){
        return next(new ErrorHandler("not logged in"),401)
    }

    const decoded = await jwt.verify(token,process.env.JWTSECRET);

    req.user = await User.findById(decoded._id); 
    next();
    
    })


    exports.issellers = CatchAsyncError(async (req,res,next) =>{
    if(req.user.userType !="seller"){
        return next(new ErrorHandler("You are not allowed to perform this action",403))
    }
    next();
    
    })

exports.isbuyers = CatchAsyncError(async (req, res, next) => {
    if (req.user.userType != "buyers") {
        return next(new ErrorHandler("You are not allowed to perform this action", 403))
    }
    next();

})

