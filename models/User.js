const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const ErrorResponse = require('../utils/ErrorResponse');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: [100, 'Your name should be less than 100 characters'],
        required: [true, 'Insert your name'],
        match: [
            /^([a-zA-Z]|\s)*$/g,
            'Your name should only contain letters and whitespace',
        ],
    },
    email: {
        type: String,
        required: [true, 'Insert your email address'],
        unique: [
            true,
            'User with the same e-mail address is already registered',
        ],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g,
            'Bad format of email',
        ],
    },
    password: {
        type: String,
        minlength: [6, 'Your password should be more than 6 characters'],
        required: [true, 'Insert your password'],
        select: false,
    },
    forgottenPassword: String,
    passwordToken: String,
    role: {
        type: String,
        enum: ['user', 'author'],
        default: 'user',
    },
    books: {
        type: mongoose.Schema.ObjectId,
        ref: 'Book',
    },
});

UserSchema.pre('save', function (next) {
    if (!this.password) {
        next();
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(this.password, salt);

    this.password = hash;
    next();
});

UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.signToken = function (user) {
    return jwt.sign(user, process.env.JWT_PRIVATE_KEY, {
        expiresIn: process.env.JWT_EXPIRES,
    });
};

module.exports = mongoose.model('User', UserSchema);
