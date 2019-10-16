const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const usersRouter = require('../users/users-router')
const authRouter = require('../users/users-router');
const server = express()
server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.use("/",(req,res) =>{
    res.send("Yes I Work")
})

module.exports = server