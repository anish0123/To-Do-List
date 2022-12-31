"use strict";
const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const userController = require("../controllers/userController");

router
    .get("/", userController.getUsers)
    .get("/token", userController.checkToken)
    .get("/:id", userController.getUser)
    .put(
        "/",
        body("name").isLength({min: 3}).trim().escape(),
        body("email").isEmail().normalizeEmail(),
        body("password").isLength({min:8}).trim(),
        body('recoveryCode').isLength({min:5}).trim(),
        userController.modifyUser
     );

module.exports = router;