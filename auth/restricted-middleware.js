const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets");

module.exports = (req, res, next) => {
  // if (req.session && req.session.user) {
  //   next();
  // } else {
  //   res.status(401).json({ message: "You shall not pass" });
  // }
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "You shall not pass" });
      } else {
        req.user = { username: decodedToken.username };
        next();
      }
    });
  } else {
    res.status(401).json({ message: "Token is invalid" });
  }
};