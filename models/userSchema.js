var mongoose = require('mongoose');
var bcrypt =require('bcrypt-nodejs');

var user = new mongoose.Schema({
  // email:{type: String},
  // name: {type: String, required: true},
  likedPosts:[{type: mongoose.Schema.ObjectId, ref:'Posts',unique:true}],
  posts: [{type: mongoose.Schema.ObjectId, ref:'Posts'}],
  comments:[{type: mongoose.Schema.ObjectId, ref: 'Comments'}],
  following:[{type: mongoose.Schema.ObjectId, ref: 'User'}],
  followers:[{type: mongoose.Schema.ObjectId, ref: 'User'}],
  google           : {
    id           : String,
    token        : String,
    email        : String,
    name         : String
  }
});

user.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
user.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', user);