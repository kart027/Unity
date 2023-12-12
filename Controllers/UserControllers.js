const ErrorHandler = require("../utils/Errorhandler");
const User = require("../Model/userModel");
const { CatchAsyncError } = require("../Middleware/CatchAsyncError");
const { sendToken } = require("../utils/SendToken");



exports.register = CatchAsyncError(async (req, res, next) => {
    const { username, userType, email, password } = req.body;
    console.log(req.body)


    if (!username || !email || !password || !userType) {
        return next(new ErrorHandler("Please addd all field", 400))
    }

    let user = await User.findOne({ email });

    if (user) {
        return next(new ErrorHandler("User alerdy exist"), 409)
    }


  
    
    user = await User.create({
        email,
        username,
        password,
        userType
    })

    sendToken(res, user, "Registerred Succesfully", 201);
})


exports.login = CatchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Please addd all field", 400))
    }

    const user = await User.findOne({ email })

    if (!user) {
        return next(new ErrorHandler("User Doesn't Exist", 400))
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
        return next(new ErrorHandler(" Incoreect Email or password  "))
    }

    sendToken(res, user, "Welcome back",)

})

exports.logout = CatchAsyncError(async (req, res, next) => {
    res.status(200).cookie("token", null, {
        expires: new Date(Date.now())
    }).json({
        sucess: true,
        message: "logout"
    })

})
