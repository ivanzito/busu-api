const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userService = require('../service/userService')

module.exports = {
  login: function(email, pwdRequestBody) {
    let user = userService.findByEmail(email)
    bcrypt.compare(user.password, pwdRequestBody, (err, res) => {
      if(res && !err) {
        // expires in 5min
        let token = jwt.sign({ 'user': user },  process.env.SECRET, {expiresIn: 3000});
        return `{'auth':true, 'token':${token}}`
      } else {
        return "{auth: false, 'token':''}"
      } 
    }) 
  }
}