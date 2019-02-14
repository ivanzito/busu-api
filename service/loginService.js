const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


  const login = (pwdUser, pwdRequestBody) => function() {
    bcrypt.compare(pwdUser  , pwdRequestBody, (err, res) => {
      if(res && !err) {
        // expires in 5min
        let token = jwt.sign({ 'user': user },  process.env.SECRET, {expiresIn: 3000});
        
        return `{'auth':true, 'token':${token}}`
      } else {
        return "{auth: false, 'token':''}"
      } 
    }) 
  }


module.exports = {login}