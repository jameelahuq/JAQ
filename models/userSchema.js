var mongoose = require('mongoose');
var bcrypt =require('bcrypt-nodejs');

var user = new mongoose.Schema({
  // email:{type: String},
  // name: {type: String, required: true},
  posts: [{type: mongoose.Schema.ObjectId, ref:'Posts'}],
  comments:[{type: mongoose.Schema.ObjectId, ref: 'Comments'}],
  following:[{type: mongoose.Schema.ObjectId, ref: 'Users'}],
  followers:[{type: mongoose.Schema.ObjectId, ref: 'Users'}],
  google           : {
    id           : String,
    token        : String,
    email        : String,
    name         : String
  }
})

user.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
user.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('Users', user);