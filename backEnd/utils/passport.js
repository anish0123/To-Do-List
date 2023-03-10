"use strict";
const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const bcrypt = require('bcryptjs');
const { getUserLogin } = require("../models/userModel");
require('dotenv').config();

// local strategy for email and password login
passport.use( new Strategy(async (email, password, done) => {
  const params = [email];
  try {
    const [user] = await getUserLogin(params);
    if (user === undefined) {
      return done(null, false, { message: "Incorrect email." });
    }
      // Hash login password and compare it to the password hash in DB.
    const passwordOk = await bcrypt.compare(password, user.password);
    if (!passwordOk) {
        return done(null, false, { message: "Incorrect password." });
    }
      // use spread syntax to create shallow copy to get rid of binary row type
    return done(null, { ...user }, { message: "Logged In Successfully" }); 
    } catch (err) {
      return done(err);
    }
  })
);

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : process.env.JWT_SECRET,
},
  (jwtPayload, done) => {
     return done(null, jwtPayload);
  }
));

module.exports = passport;