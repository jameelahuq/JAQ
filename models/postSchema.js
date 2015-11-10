var mongoose = require('mongoose');

var posts = new mongoose.Schema({
  author:{type: mongoose.Schema.ObjectId, ref:'User'}, 
  date: {type: Date, default: Date.now},
  thePost:{type:String, required: true},
  likes: {type: Number, default:0},
  comments: [{type: mongoose.Schema.ObjectId, ref:'Comments' }],
  title: {type: String, required:true},
  tags:[String]
})

posts.methods.likeIt = function(){
  this.likes ++
}
posts.methods.dislikeIt = function(){
  this.likes --
}

module.exports = mongoose.model('Posts',posts);