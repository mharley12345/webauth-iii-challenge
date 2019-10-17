const express = require('express')

const Users = require('./user-model')
const mw = require('../auth/auth-middleware')

const router = express.Router()

// gets all users
router.get('/', mw.restricted, (req, res) => {
  Users.find()
    .then(users => res.json(users))
    .catch(err => res.status(500).json({ message: 'error retrieving users' }))
})

// gets all users that are in the same department
router.get('/stretch', mw.restricted, (req, res) => {
  const token = req.headers.authorization

  const decodedUserId = mw.extractUserId(token)
  
  Users.findDept(decodedUserId)
    .then(users => res.json(users))
    .catch(err => res.status(500).json({ message: 'error retrieving users' }))
})

module.exports = router