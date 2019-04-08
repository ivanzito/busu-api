const bcrypt = require('bcrypt')
const userRepository = require('../repository/userRepository')

module.exports = {
    findAll: function() {
        return userRepository.findAll()
    },

    findByEmail: function(email) {
        return userRepository.findByEmail(email)
    },
    
    save: function(email, pwd) {
        return userRepository.save(email, pwd)
    },

    newUser: function(email, password) {
        const saltRounds = 10
        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                let user = this.save(email, hash)
                console.log('newUser',user)
            })
        })
    }
}