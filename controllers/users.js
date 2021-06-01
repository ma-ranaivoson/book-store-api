const asyncHandler = require('../middlewares/asyncHandler');
const User = require('../models/User');
const ErrorResponse = require('../utils/ErrorResponse');

// @route   GET /api/v1/users
// @desc    Get all users in the database
// @access  Private/Admin
exports.getUsers = asyncHandler(async (req, res, next) => {
    const user = await User.find();
    const query = req.query;

    if (!user) {
        next(new ErrorResponse('There is no user in the database'));
    }

    res.status(200).json({
        success: true,
        count: user.length,
        data: user,
    });
});

// @route   POST /api/v1/users
// @desc    Create User
// @access  Private/Admin
exports.createUser = asyncHandler(async (req, res, next) => {
    const user = await User.create(req.body);

    if (!user) {
        return next(new ErrorResponse('Server error', 500));
    }

    res.status(201).json({
        success: true,
        data: user,
    });
});
