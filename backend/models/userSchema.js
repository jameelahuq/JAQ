var mongoose = require('mongoose');

var user = new mongoose.Schema({
  email:{type: String},
  name: {type: String, required: true},
  posts: [{type: mongoose.Schema.ObjectId, ref:'Posts'}]
})

module.exports = mongoose.model('User', user);