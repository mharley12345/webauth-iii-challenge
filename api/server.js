const express = require('express')

const authRouter = require('./auth/auth-router')
const usersRoute = require('./users/user-route')


const server = express()

// Global Middleware
server.use(express.json())

// Route handling
server.use('/api/auth', authRouter)
server.use('/api/users', usersRoute)

// Hello world test
server.get('/', (req, res) => {
  res.json('Hello from webauth-iii-challenge!')
})

module.exports = server