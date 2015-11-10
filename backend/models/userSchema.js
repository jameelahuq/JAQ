var mongoose = require('mongoose');

var user = new mongoose.Schema({
  name: {type: String, required: true},
})

module.exports = mongoose.model('User', user);