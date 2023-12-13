const User = require("../Model/userModel");
const jwt = require("jsonwebtoken");
const  ErrorHandler  = require("../utils/Errorhandler");
const { CatchAsyncError } =require("../Middleware/CatchAsyncError");


exports.isAuthenticated = CatchAsyncError(async (req,res,next) =>{
    
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return next(new ErrorHandler("not logged in",401))
    }
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        req.token = token;
        console.log(token)
    const decoded = await jwt.verify(token,process.env.JWTSECRET);

    req.user = await User.findById(decoded._id); 
    console.log(req.user)
    
    }
    next();
    })


    exports.issellers = CatchAsyncError(async (req,res,next) =>{
    if(req.user.userType !="seller"){
        return next(new ErrorHandler("You are not allowed to perform this action",403))
    }
    next();
    
    })

exports.isbuyers = CatchAsyncError(async (req, res, next) => {
    if (req.user.userType != "buyer") {
        return next(new ErrorHandler("You are not allowed to perform this action", 403))
    }
    next();

})

