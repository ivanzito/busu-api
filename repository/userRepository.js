const db = require('../config/db/mongoose')
    const findAll = () => function() {
        const Users = db.Mongoose.model('users', db.UserSchema, 'users')
        Users.find({}, (err, arr) => {
            if (err) []
            else arr
        }).lean();
        
    }

    const findUserByEmail = (email) => function() {
        const Users = db.Mongoose.model('users', db.UserSchema, 'users')
        Users.findOne({'email': email}).exec((err, user) => {
            if(err) err
            if(user != null) user 
        }).lean()   
    }

    const saveUser = user => function() {
        const Users = db.Mongoose.model('users', db.UserSchema, 'users')
        return Users.save(user), (err, user) => {
            if(err) return err
            else return user.lean()
        }
    }

module.exports = {
    findAll,
    findUserByEmail,
    saveUser
}