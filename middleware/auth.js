const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const jwt = require("jsonwebtoken");
const ErrorHandler = require('../utils/errorHandler');

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401).json({
        message: 'Auth Token Required'
      })

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403).json({
        message: 'Unauthorized'
      })
      req.user = user
      next()
    })
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resouce `,
          403
        )
      );
    }

    next();
  };
};