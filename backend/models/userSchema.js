var mongoose = require('mongoose');

var user = new mongoose.Schema({
  email:{type: String},
  name: {type: String, required: true},
  posts: [{type: mongoose.Schema.ObjectId, ref:'Posts'}],
  comments:[{type: mongoose.Schema.ObjectId, ref: 'Comments'}]
})

module.exports = mongoose.model('User', user);