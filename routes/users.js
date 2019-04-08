const express = require('express')
const router = express.Router()
const userService = require('../service/userService')
const loginService = require('../service/loginService')

/* GET users listing. */
router.get('/', function(req, res, next) {
  return Promise.resolve(userService.findAll())
                .then(onfulfilled => {res.send(onfulfilled).end()})
})

/* POST users login */
router.post('/login', function(req, res, next) {  
  let response = loginService.login(req.body.mail, req.body.password)
  if(response.auth) return res.status(200).send(response).end()
  else res.status(401).send(response).end()

})


/* POST users listing. */
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
