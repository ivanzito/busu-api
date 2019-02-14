var mongoose = require('mongoose');
//mongoose.connect(process.env.MONGODB_URI);
mongoose.connect('mongodb://localhost/users',{ useNewUrlParser: true })
let userSchema = new mongoose.Schema({
    email: String,
    password: String
}, { collection: 'users' }
);

module.exports = { Mongoose: mongoose, UserSchema: userSchema }
