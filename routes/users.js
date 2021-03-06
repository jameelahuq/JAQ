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


// This route will return a user with their "posts" field populated
router.get('/profile/:userId',function(req,res){
  User.findById(req.params.userId)
  .populate('posts')
  .exec(function (err, data){
    err ? res.status(401).send(err) : res.send(data)
  })
});


router.get('/:field/profile/:userId',function(req,res){
  User.findById(req.params.userId)
      .populate(req.params.field)
      .exec(function (err, data){
        err ? res.status(401).send(err) : res.send(data)
      })
});

// This will add the user to the "follower" array of another user, and add
// the followed user to the "followed" array of the follower.
router.post('/follow/profile/:toFollowId', function (req, res) {
  User.findByIdAndUpdate(req.user._id, {
    $addToSet: {
      'following': req.params.toFollowId
    }
  }, function (err, data) {
    User.findByIdAndUpdate(req.params.toFollowId, {
      $addToSet: {
        'followers': req.user._id
      }
    }, function (err, result) {
      if (err) res.send(err);
      res.send(result);
    })
  })
});

// This route will return a user with their "posts" field populated
router.get('/profile/:userId',function(req,res){
  User.findById(req.params.userId)
  .populate('posts')
  .exec(function (err, data){
    err ? res.status(401).send(err) : res.send(data)
  })
});


router.get('/:field/profile/:userId',function(req,res){
  User.findById(req.params.userId)

      .populate(req.params.field)
      .exec(function (err, data){
        err ? res.status(401).send(err) : res.send(data)
      })
});

// This will add the user to the "follower" array of another user, and add
// the followed user to the "followed" array of the follower.
router.post('/follow/profile/:toFollowId', function (req, res) {
  User.findByIdAndUpdate(req.user._id, {
    $addToSet: {
      'following': req.params.toFollowId
    }
  }, function (err, data) {
    User.findByIdAndUpdate(req.params.toFollowId, {
      $addToSet: {
        'followers': req.user._id
      }
    }, function (err, result) {
      if (err) res.send(err);
      res.send(result);
    })
  })
});

// This will remove the relevant "followed" and "following" ids from the relevant places
router.post('/unfollow/profile/:userId', function(req,res){
  User.find(req.user._id, function(err,followerData){
    User.find({_id:req.params.userId}, function(err, followedData){

      var toRemove = followedData[0].followers;
      if(err)res.send(err);
      if(toRemove.indexOf(req.user._id)>=0){
        toRemove.splice(toRemove.indexOf(req.user._id),1)
      }

      followedData[0].save()
    });
    var toDelete = followerData[0].following;
    if(err)res.send(err);
    if(toDelete.indexOf(req.params.userId) >= 0) {
        toDelete.splice(toDelete.indexOf(req.params.userId),1)
      }

      followerData[0].save();
      res.send(toDelete)
  })
});

// This will return all the users with all of their posts
module.exports = router;

