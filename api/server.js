const express = require('express')

const authRouter = require('./auth/auth-router')
const usersRoute = require('./users/users-route')
const mw = require('./server-middleware')

const server = express()

// Global Middleware
server.use(express.json())
server.use(mw.logger)

// Route handling
server.use('/api', authRouter)
server.use('/api/users', usersRoute)

// Hello world test
server.get('/', (req, res) => {
  res.json('Hello from webauth-iii-challenge!')
})

module.exports = server