const express = require('express')
const router = express.Router()
const userService = require('../service/userService')
const loginService = require('../service/loginService')
/* GET users listing. */
router.get('/', function(req, res, next) {
  /*const db = require('../config/db/mongoose')
  const Users = db.Mongoose.model('users', db.UserSchema, 'users')
  Users.find()
       .lean()
       .exec((e,docs) => {res.json(docs).end()})*/


  res.json(userService.findAll()).end()
  
})

/* POST users login */
router.post('/login', function(req, res, next) {

  /*
  const db = require('../config/db/mongoose')
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
            let token = jwt.sign({ 'user': user },  process.env.SECRET, {expiresIn: 3000});
            
            console.log({'auth': true, 'token': token})
            response.status(200).send({'auth': true, 'token': token}).end()
          } else {
            response.status(401).json(user).end()
          } 
        })        
  }) */


  let user = userService.findUserByEmail(req.body.email)
  
  console.log(user)

  let response = loginService.login(user.email, req.body.password)
  
 

  if(response.auth) return res.status(200).send(response).end()
  else res.status(401).send(response).end()

})


/* POST users listing. */
router.post('/', function(req, res, next) {
 /*
  const db = require('../config/db/mongoose')
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
 */

 let user = userService.newUser(req.body.email, req.body.password)
 if(user instanceof Users) return user
 else "Não foi possível criar o usuário"
})

module.exports = router
