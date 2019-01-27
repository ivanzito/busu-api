var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/users');

let userSchema = new mongoose.Schema({
    email: String,
    password: String
}, { collection: 'users' }
);

module.exports = { Mongoose: mongoose, UserSchema: userSchema }
