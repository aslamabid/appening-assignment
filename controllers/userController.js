const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const User = require('../models/userModel');

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
        return next(new ErrorHandler("Please Enter Name, Email, Password", 400));
    }

    const user = await User.create({
        name,
        email,
        password,
        role
    });

    res.status(201).json({
        user
    })
});

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    // checking if user has given password and email both

    if (!email || !password) {
        return next(new ErrorHandler("Please Enter Email & Password", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    res.status(201).json({
        user,
        token: user.getJWTToken()
    })
});

exports.users = catchAsyncErrors(async (req, res, next) => {
    const user = await User.find();

    res.status(200).json({
        user
    })
});

exports.findAnagram = async(req, res, next) => {
    const { string1, string2 } = req.body;

    const x = string1.toLowerCase().split("").sort().join("");
    const y = string2.toLowerCase().split("").sort().join("");

    if(x === y) {
        res.status(200).json({
            message: true
        })
    } else {
        res.status(400).json({
            message: false
        })
    }
}