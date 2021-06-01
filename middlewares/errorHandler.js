const ErrorResponse = require('../utils/ErrorResponse');

const errorHandler = async (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map((val) => val.message);
        error = new ErrorResponse(message, 400);
    }

    res.status(400).json({
        success: false,
        message: error.message || 'Server error',
    });
};

module.exports = errorHandler;
