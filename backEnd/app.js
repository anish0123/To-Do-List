"use strict";
const express = require('express');
const app = express();
const cors = require('cors');
const authRouter = require('./routes/authRoute');
const userRouter = require('./routes/userRoute');
const passport = require('./utils/passport');

const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(passport.initialize());

app.use('/auth', authRouter);
app.use('/user', passport.authenticate('jwt', {session: false}), userRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
