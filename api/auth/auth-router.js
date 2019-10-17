  
const express = require('express')
const bcrypt = require('bcryptjs')

const Users = require('../users/users-model')
const mw = require('./auth-middleware')

const router = express.Router()

router.post('/register', (req, res) => {
  const newUser = req.body
  const hash = bcrypt.hashSync(newUser.password, 12)

  newUser.password = hash

  Users.add(newUser)
    .then(user => {
      const token = mw.generateToken(user)

      res.status(201).json({ token })
    })
    .catch(err => res.status(500).json({ message: 'error registering' }))
})

router.post('/login', (req, res) => {
  const { username, password }= req.body

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = mw.generateToken(user)

        res.json({ token })
      } else res.status(401).json({ message: 'You shall not pass!' })
    })
    .catch(err => res.status(500).json({ message: 'error logging in' }))
})

module.exports = router