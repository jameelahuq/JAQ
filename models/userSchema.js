var mongoose = require('mongoose');
//var bcrypt =require('bcrypt-nodejs');

var user = new mongoose.Schema({
  posts: [{type: mongoose.Schema.ObjectId, ref:'Posts'}],
  comments:[{type: mongoose.Schema.ObjectId, ref: 'Comments'}],
  following:[{type: mongoose.Schema.ObjectId, ref: 'Users'}],
  followers:[{type: mongoose.Schema.ObjectId, ref: 'Users'}],
  displayName: {type: String, required: true},
  email: {type : String, required: true},
  image: String
});




//
//user.methods.generateHash = function(password) {
//  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
//};
//
//// checking if password is valid
//user.methods.validPassword = function(password) {
//  return bcrypt.compareSync(password, this.local.password);
//};

module.exports = mongoose.model('User', user);