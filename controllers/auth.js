const asyncHandler = require('../middlewares/asyncHandler');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/ErrorResponse');

// @route   GET /api/v1/auth
// @desc    Connect to an user account
// @access  Public
exports.connect = asyncHandler(async (req, res, next) => {
    // Compare if user exists in the database
    // If exists then send a token
    const { email, password } = req.body;

    if (!email || !password) {
        return next(
            new ErrorResponse('Please provide an email and a password', 404)
        );
    }

    let user = await User.findOne({ email }).select('+password');

    if (!user) {
        return next(new ErrorResponse('Credentials error', 400));
    }

    // Compare the password of the user
    if (!user.comparePassword(password)) {
        return next(new ErrorResponse('Password error', 400));
    }

    // Get the user token
    const token = user.signToken({ user });

    res.status(200)
        .cookie('token', token, {
            expires: new Date(Date.now() + 60 * 60 * 24 * 10 * 1000),
        })
        .json({
            success: true,
            token,
        });
});

// @route   POST /api/v1/auth/user
// @desc    Register a user
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
    // Compare if user exists in the database
    // If exists then send a token
    const { name, email, password, role } = req.body;

    if (!email || !password || !name) {
        return next(
            new ErrorResponse('Please provide all mandatory fields', 400)
        );
    }

    let user = await User.create(req.body);

    const token = user.signToken({ user });

    res.status(200)
        .cookie('token', token, {
            expires: new Date(Date.now() + 60 * 60 * 24 * 10 * 1000),
        })
        .json({
            success: true,
            token,
        });
});

// @route   GET /api/v1/auth/user
// @desc    Get the current user
// @access  Private
exports.user = asyncHandler(async (req, res, next) => {
    // Get the token and verify it
    jwt.verify(req.cookies.token, process.env.JWT_PRIVATE_KEY, async function (err, decoded) {
        if (err) {
            return next(new ErrorResponse('No user is signed'));
        }
        const user = await User.findById(decoded.user._id);

        res.status(200).json({
            success: true,
            data: user,
        });
    });
});

// @route   GET /api/v1/auth/logout
// @desc    Logout the current user
// @access  Private
exports.logout = asyncHandler(async (req, res, next) => {
    res.status(200).cookie('token', null).json({
        success: true,
        data: {},
    });
});
