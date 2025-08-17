module.exports = role => {
    return (req, res, next) => {
      // check that the role that was in the token is the role passed as an argument?
      if (role === req.user.role) {
        next();
      } else {
        res.status(403).json({ you: "can't touch this" });
      }
    };
  };
  