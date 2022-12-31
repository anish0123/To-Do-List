"use strict";
const express = require("express");
const router = express.Router();
const {body} = require('express-validator');
const {login, register, logout} = require("../controllers/authcontroller");


router.post('/login', login);

router.post('/register',
body('name').isLength({min: 4}).trim,
body('email').isEmail,
body('password').isLength({min: 8}).trim(),
body('recoveryCode').isLength({min:5}).trim(),
register);

router.get('/logout', logout);
module.exports = router;
