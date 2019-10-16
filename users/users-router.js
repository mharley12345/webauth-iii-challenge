const router = require('express').Router();
const restricted = require('../auth/restricted-middleware.js');
const Users =  require('./users-model.js')


router.get('/', restricted,(req,res,next) =>{
    Users.find()
       .then(users =>{
           res.json({loggedInUser: req.username, users})
       })
       .catch(err => res.send(err))
       next()
})
module.exports = router;