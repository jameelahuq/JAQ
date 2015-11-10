var mongoose = require('mongoose');

var posts = new mongoose.Schema({
  author:String, // make this into a userSchema 
  date: Date,
  likes: {type: Number, default:0},

  comments: String, // this will be linked to comment schema
  title: {type: String, required:true}
})

posts.methods.likeIt = function(){
  this.likes ++
}

module.exports = mongoose.model('Posts',posts);