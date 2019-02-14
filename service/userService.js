var bcrypt = require('bcrypt')
var userRepository = require('../repository/userRepository')

    
    const findAll = () => function() {
        userRepository.findAll()
    }

    const findUserByEmail = (email) => function() {
        let user = userRepository.findUserByEmail(email)
        console.info(user)
        return user
    }
    
    const saveUser = (User) => function() {
        userRepository.saveUser(User)
    }

    const newUser = (email, password) => function() {
        const saltRounds = 10
        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                let newUser = new Users({ 'email': email, 'password': hash })
                    newUser.save((err) => {
                        if (err) false
                        else newUser
                })
            })
        })
    }

module.exports = {
    newUser,
    saveUser,
    findUserByEmail,
    findAll
}