var mongoose = require('mongoose');


var comments = new mongoose.Schema({
  author:{type: mongoose.Schema.ObjectId, ref:'User' },
  text:{type:String, required: true},
  likes: {type: Number, default: 0}
})

module.exports = mongoose.model('Comments', comments);