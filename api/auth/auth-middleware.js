  
const jwt = require('jsonwebtoken')

const secrets = require('../../config/secrets')

module.exports = {
  restricted,
  generateToken,
  extractUserId,
}

// Restrict access based on valid token
function restricted(req, res, next) {
  const token = req.headers.authorization

  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) res.status(401).json({ message: 'you shall not pass!' })
      else {
        req.user = { username: decodedToken.username }
        next()
      }
    })
  } else res.status(400).json({ message: 'no credentials provided' })
}

// Generate token via JWT
function generateToken(newUser) {
  const payload = {
    user_id: newUser.id
  }
  const options = {
    expiresIn: '1d'
  }

  return jwt.sign(payload, secrets.jwtSecret, options)
}

// Extract department from user via JWT
function extractUserId(token) {
  let userId = ''

  jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
    userId = JSON.stringify(decodedToken.user_id)
  })
  
  return userId
}