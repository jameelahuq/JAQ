var express = require('express');
var router = express.Router();
var User = require('../models/userSchema');


// Follow a user. Push the reference of the follower into the followed
// persons "followers" array, and push the reference of the followed person
// into the followers "followed" array
router.post('/follow/:followersId/:toFollowId', function(req,res){
  User.findByIdAndUpdate(req.params.followersId,{$push:{
    'following':req.params.toFollowId}
  }, function(err,data){
    User.findByIdAndUpdate(req.params.toFollowId, {$push:{
      'followers': data._id}
    }, function(err,result){
      if(err) res.send(err);
      res.send(result);
    })
  })
})

// This will return a populated array of a user's "followed", "followers",
// "comments" or "posts" array depending on the ':field' variable.
router.get('/users/:userId/:field',function(req,res){
  User.findById(req.params.userId)
  .populate(req.params.field)
  .exec(function (err, data){
    err ? res.status(401).send(err) : res.send(data[req.params.field])
  })
})

module.exports = router;
