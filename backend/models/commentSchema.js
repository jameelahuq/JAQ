var mongoose = require('mongoose');


var comments = new mongoose.Schema({
  author:{type: Mongoose.Schema.ObjectId, ref:'User' },
  text:{type:String, required: true},
  likes: {type: Number, default: 0}
})
