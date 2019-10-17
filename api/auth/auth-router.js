const router = require('express').Router();
const db = require('../users/user-model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const secrets = require('../../config/secrets');

// for endpoints beginning with /api/auth
router.post('/register', (req, res) => {
  let user = req.body;
  console.log("THisIS",user)
  const hash = bcrypt.hashSync(user.password,10); // 2 ^ n
 user.password = hash

  db.add(user)
    .then(saved => {
      console.log("Add Route",saved)
      res.status(201).json(saved);
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ message: 'cannot add the user', error });
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  db.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        // produce token
        const token = generateToken(user);

        // add token to response
        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token,
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});
router.get("/logout",(req,res) =>{
  if(req.session){
    req.session.destroy(err =>{
      res
        .status(200)
        .json({
          message:
          'Logout successfull'
        })
    })
  }else {
    res.status(200).json({message:'Not logged in'})
  }
})


function generateToken(user) {
  const payload = {
    username: user.username,
    subject: user.id,
    role: user.role,
  };
  const options = {
    expiresIn: '1h',
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
}


module.exports = router;
