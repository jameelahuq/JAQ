var mongoose = require('mongoose');


var comments = new mongoose.Schema({
  author:{type: mongoose.Schema.ObjectId, ref:'User' },
  text:{type:String, required: true},
  likes: {type: Number, default: 0},
  date: {type: Date, default:Date.now}
})

comments.methods.likeIt = function(){
  this.likes ++
}

module.exports = mongoose.model('Comments', comments);