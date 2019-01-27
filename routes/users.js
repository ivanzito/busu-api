const express = require('express')
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
const router = express.Router()

const saltRounds = 10

/* GET users listing. */
router.get('/', function(req, res, next) {
  const db = require('../db')
  const Users = db.Mongoose.model('users', db.UserSchema, 'users')
  Users.find()
       .lean()
       .exec((e,docs) => {res.json(docs).end()})
})

/* POST users login */
router.post('/login', function(req, res, next) {
  const db = require('../db')
  const Users = db.Mongoose.model('users', db.UserSchema, 'users')
  Users.findOne({'email': req.body.email})
       .exec((err, user) => {
        if(err) {
          res.status(500).json(err).end()
        }

        if(user == null) {
          res.status(401).json("Usuario nao encontrado").end()
        }

        let response = res
        bcrypt.compare(req.body.password  , user.password, (err, res) => {
          if(res) {
            // expires in 5min
            console.log(process.env.SECRET)
            let token = jwt.sign({ 'user': user },  process.env.SECRET, {expiresIn: 3000});
            console.log(token)
           
            response.status(200).send({'auth': true, 'token': token}).end()
          } else {
            response.status(401).json(user).end()
          } 
        })        
  }) 
})


/* POST users listing. */
router.post('/', function(req, res, next) {
  const db = require('../db')
  let Users = db.Mongoose.model('users', db.UserSchema, 'users')
  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      let newUser = new Users({ 'email': req.body.email, 'password': hash })
      newUser.save((err) => {
        if (err) {
            res.status(500)
              .json({ error: err.message })
              .end()
            return
        }
        res.json(newUser).end()
      })
    })
  })
})

module.exports = router
