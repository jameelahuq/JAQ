var mongoose = require('mongoose');

var posts = new mongoose.Schema({
  author:{type: mongoose.Schema.ObjectId, ref:'User'}, 
  date: {type: Date},
  likes: {type: Number, default:0},
  comments: {type: mongoose.Schema.ObjectId, ref:'Comments' },
  title: {type: String, required:true}
})

posts.methods.likeIt = function(){
  this.likes ++
}

module.exports = mongoose.model('Posts',posts);