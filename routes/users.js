const express = require('express')
const router = express.Router()
const userService = require('../service/userService')
const loginService = require('../service/loginService')

router.get('/', function(req, res, next) {
  return Promise.resolve(userService.findAll())
                .then(onfulfilled => {res.send(onfulfilled).end()})
})

router.get('/email/:email', function(req, res, next) {
  return Promise.resolve(userService.findByEmail(req.params.email))
                .then(onfulfilled => {res.send(onfulfilled).end()})
})

router.post('/login', function(req, res, next) {  
  return Promise.resolve(loginService.login(req.body.mail, req.body.password))
                .then(onfulfilled => res.status(200).send(onfulfilled).end())
                .catch(ex => res.status(401).send(ex).end())
  
})

router.post('/', function(req, res, next) {
 let user = userService.newUser(req.body.mail, req.body.password)
  if(user) res.json(user)
              .status(200)
              .end()
 else res.json("{error:'Não foi possível criar o usuário'}")
         .status(500)
         .end()
})

module.exports = router
