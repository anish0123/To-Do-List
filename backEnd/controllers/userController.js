"use strict";

const userModel = require("../models/userModel");
const {validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const passport = require("../utils/passport");


/**
 * Function for getting all Users
 */
const getUsers = async(req, res) => {
    const users = await userModel.getAllUsers(res);
    users.map((user) => {
        delete user.password;
    });
    res.json(users);
};


/**
 * Function for getting single user
 */
const getUser = async (req, res) => {
    const user = await userModel.getUserById(res, req.params.id);
    if(user) {
        delete user.password;
        res.json(user);
    } else {
        res.sendStatus(404);
    }
};

/**
 * Function to add users
 */
const addUser = async ( req, res) => {
    const errors = validationResult(req);
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(req.body.password, salt);
    req.body.password = passwordHash;
    const user = req.body;
    if(!user.role) {
        user.role = "user";
    }
    const addUser = await userModel.addUser(user, res);
    if(addUser){
    res.status(201).json({message: "user created", userID: addUser});
    } else {
    res.status(404).json({message: "user creation failed", errors: errors.array()});
}
};

/**
 * Function to check token
 */
const checkToken = (req, res) => {
    delete req.user.password;
    res.json({user: req.user});
};

/**
 * Function for modifying user
 */
const modifyUser = async (req, res) => {
    const errors = validationResult(req);
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(req.body.password, salt);
    req.body.password = passwordHash;

    const updateUser = await userModel.modifyUser(res, req);
    if (updateUser) {
        res.status(201).json({ message: "User data updated" });
      } else {
        res
          .sendStatus(404)
          .json({ message: "user creation failed", errors: errors.array() });
      };
};

module.exports = {
    addUser,
    getUsers,
    getUser,
    checkToken,
    modifyUser
};