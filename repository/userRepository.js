const db = require('../config/db/mongoose')

module.exports = {
    findAll: function() {
        const Users = db.Mongoose.model('users', db.UserSchema, 'users')
        return Promise.resolve(Users.find({})
                                    .lean()
                                    .then(res => res, err => new Error(err))
                               )
    },

    findByEmail: function(mail) {
        const Users = db.Mongoose.model('users', db.UserSchema, 'users')
        return Users.findOne({'email': mail})
                    .lean()
                    .then(doc => doc, err => new Error(err))
    },

    save: function(mail, password) {
        const Users = db.Mongoose.model('users', db.UserSchema, 'users')
        const user = new Users({'email': mail, 'password':password})
        user.save((err, user) => {
            if(err) new Error(err)
            else {
                return Users.findById(user._id)
                            .lean()
                            .catch(doc => console.info(doc), err => new Error(err))
            } 
        })
    }
}