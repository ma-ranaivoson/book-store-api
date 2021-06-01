const express = require('express');
const router = express.Router();
const { connect, register, user, logout } = require('../controllers/auth');

router.route('/login').get(connect);
router.route('/register').post(register);
router.route('/user').get(user);
router.route('/logout').get(logout);


module.exports = router;
