var express = require('express');
var router = express.Router();
var User = require('../models/userSchema');

/* GET users listing. */

// This will return the users data
router.get('/id',function(req,res){
  User.findById(req.user._id)
      .exec(function (err, data){
        err ? res.status(401).send(err) : res.send(data)
      })
});


// This will take the parameter variable "field" and return the populated
// array of that field for that user.
router.get('/:field',function(req,res){
  User.findById(req.user._id)
      .populate(req.params.field)
      .exec(function (err, data){
        err ? res.status(401).send(err) : res.send(data[req.params.field])
      })
});

// This will add the user to the "follower" array of another user, and add
// the followed user to the "followed" array of the follower.
router.post('/follow/:followersId/:toFollowId', function (req, res) {
  User.findByIdAndUpdate(req.params.followersId, {
    $push: {
      'following': req.params.toFollowId
    }
  }, function (err, data) {
    User.findByIdAndUpdate(req.params.toFollowId, {
      $push: {
        'followers': data._id
      }
    }, function (err, result) {
      if (err) res.send(err);
      res.send(result);
    })
  })
})

// This will return all the users with all of their posts
router.get('/everything', function (req, res) {
  console.log(res)
  User.find({})
    .populate("posts")
    .exec(function (err, data) {
      err ? res.status(401).send(err) : res.send(data)
    })
})

module.exports = router;