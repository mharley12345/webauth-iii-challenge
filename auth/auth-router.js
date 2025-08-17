const server = require('express')
const express = require("express")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.secrets;
const Users = require('../users/users-model.js');
const secrets = require('../config/secrets.js');
const router = express(server)
// for endpoints beginning with /api/auth
router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json({ message: 'cannot add the user',error });
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
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
router.get('/users',(req,res,next,jwt)=>{

  Users.find(jwt)
     if(jwt){
       res.status(200).json({message: "Token Valid, Have a nice day!!!!!"}).next()
     }else{
       res.status(404).json({messge:"NO NO NO!!!!!!!! Invalid,missing,or incorect JWT. DO BETTER"})
     };
}
)
     .then(status =>{
       res.status(401).json({message:"You are already logged in",...status},next())

     })
     .catch(err =>{
       res.status(500).json({message:"Sorry we sucke Error:",err})
     })
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
  