"use strict";
const pool = require("../database/database");
const promisePool = pool.promise();

/**
 * Funtion to get list of all the users
 */
const getAllUsers = async (res) => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner's name as ownername (from wop_user table).
    const [rows] = await promisePool.query("SELECT * FROM user");
    return rows;
  } catch (e) {
    res.status(500).send(e.message);
    console.error("error", e.message);
  }
};

/**
 * Function to get user according to Id
 */
const getUserById = async (res, userId) => {
  try {
    const [rows] = await promisePool.query("SELECT * FROM user WHERE id =?", [
      userId,
    ]);
    return rows[0];
  } catch (e) {
    res.status(500).send(e.message);
    console.error("error", e.message);
  }
};

/**
 * Function to check email address entered to log in
 */
const getUserLogin = async (userEmail) => {
  try {
    console.log("getUserLogin", userEmail);
    const [rows] = await promisePool.execute(
      "SELECT * FROM user WHERE email = ?;",
      userEmail
    );
    return rows;
  } catch (e) {
    console.log("error", e.message);
    res.status(500).send(e.message);
  }
};

/**
 * Function to add user
 */
const addUser = async(res, user) => {
    try{
        let query = 'INSERT INTO `user` (name,email,password,recoveryCode,role) values (?,?,?,?,?';
        return promisePool.query(query,[
            user.name,
            user.email,
            user.password,
            user.recoveryCode,
            user.role
        ]);
    } catch (e) {
        res.status(500).send(e.message);
        console.error("error", e.message);
    }
};

/**
 * Function to modify user
 */
const modifyUser = async(res, req) => {
    try{
        const user = req.body;
        let query = 'UPDATE user SET name = ?, email = ?, password = ?, recoveryCode = ? where id = ?';
        return promisePool.query(query,[
            user.name,
            user.email,
            user.password,
            user.recoveryCode

        ]);
    } catch (e) {
        res.status(500).send(e.message);
        console.error("error", e.message);
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    getUserLogin,
    addUser,
    modifyUser
};