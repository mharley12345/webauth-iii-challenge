const jwt = require('jsonwebtoken');

const secrets = require('../config/secrets.js');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    // check that the token is valid
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        // foul play
        res.status(401).json({ message: 'Bad panda!' });
      } else {
        // token is goooooooooooooooooood
        req.user = {
          username: decodedToken.username,
          role: decodedToken.role,
        };
        next();
      }
    });
  } else {
    res.status(400).json({ message: 'No token provided' });
  }
};
