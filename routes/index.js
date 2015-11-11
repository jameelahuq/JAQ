var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Mailgun = require('mailgun-js');
var config = require('../config/config.js');


// require the mongoose schemas
var Post = require('../models/postSchema');
var Comment = require('../models/commentSchema');
var User = require('../models/userSchema');

// Like a comment. Increments the comments likes by 1
router.post('/likedComment/:liked', function(req,res){
  Comment.findById(req.params.liked,function(err,commentLiked){
    commentLiked.likeIt();
    commentLiked.save(function(err,savedTask){
      res.send(savedTask)
    })
  });
})

// Remove a comment. Only the user can do this
router.delete('/removeComment/:commentId/:userId', function(req,res){
  Comment.findById(req.params.commentId, function(err,data){
    if (data && data.author == req.params.userId){
      data.remove();
      data.save();
      res.send(data + ' was removed')
    }else{
      res.send('The file was not found or you do not have permission to delete it')
    }
  })
})

// Add a comment. This will put a reference to the comment in the user's and
// post's "comments" arrays.
router.post('/addComment/:postId/:userId', function(req, res){
  Comment.create({              //
    author: req.params.userId, //need to associate with a post
    text: req.body.text         //
  }, function(err,comment){
    if(err) res.send(err);
    User.findByIdAndUpdate(req.params.userId ,{$push:{
      'comments':comment._id}
    }, function(err,user){
      Post.findByIdAndUpdate(req.params.postId ,{$push:{
        'comments':comment._id}
      },function(err,thePost){
        if(err) res.send(err);
        thePost.save();
        user.save();
      })
    })
    res.send(comment)
  }) 
})

// MAILGUN 
router.get('/submit/:mail', function(req,res) {
  var mailgun = new Mailgun({
    apiKey: config.MAILGUN_KEY, 
    domain: config.MAILGUN_DOMAIN
  });

  var data = {
    from: 'JAQd@blogs.com',
    to: req.params.mail, 
    subject: "Hello from JAQ'd",
    html: 'Somebody has commented on your post.'
  }
  mailgun.messages().send(data, function (err, body) {
    if (err) {
      res.send(err)
    }

    else {
      res.status('submitted').send({ email : req.params.mail });
    }
  });

});

module.exports = router;
