var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Mailgun = require('mailgun-js');
var config = require('../config/config.js');


// require the mongoose schemas
var Post = require('../models/postSchema');
// var Comment = require('../models/commentSchema');
var User = require('../models/userSchema');



// Finds all posts
router.get('/getPosts', function (req, res) {
  Post.find({}, function (err, data) {
    if (err) {
      res.send(err)
    }
    res.send(data)
  })
});

// Adds a post. Pushes the id of itself into the authors "posts" array.
router.post('/addPost', function (req, res) {
  Post.create({
    author: req.user._id,
    thePost: req.body.thePost,
    likes: req.body.likes,
    comments: req.body.comments,
    title: req.body.title,
    tags: req.body.tags
  }, function (err, data) {
    if (err) {
      res.send(err)
    }
    User.findByIdAndUpdate(req.user._id, {
      $push: {
        'posts': data._id
      }
    }, function (err, user) {
      if (err) res.send(err);
      user.save();
    })
    res.send(data);
  })
})

// Increments the "liked" field of the post by 1
router.post('/likedPost/:liked', function (req, res) {
  Post.findById(req.params.liked, function (err, postLiked) {
    postLiked.likeIt();
    postLiked.save(function (err, savedTask) {
      res.send(savedTask)
    })
  });
})

// Decrements the "liked" field of the post by 1
router.post('/dislikedPost/:liked', function (req, res) {
  Post.findById(req.params.liked, function (err, postLiked) {
    postLiked.dislikeIt();
    postLiked.save(function (err, savedTask) {
      res.send(savedTask)
    })
  });
})

// Removes the post, needs the author's id to complete
router.delete('/removePost/:postId/:userId', function (req, res) {
  Post.findById(req.params.postId, function (err, data) {
    if (data && data.author == req.params.userId) {
      data.remove();
      data.save();
      res.send(data + ' was removed')
    } else {
      res.send('The file was not found or you do not have permission to delete it')
    }

  })
})

// Removes the post without need for author verification
router.delete('/removePost/:postId/', function (req, res) {
  Post.findById(req.params.postId, function (err, data) {
    if (data) {
      data.remove();
      data.save();
      res.send(data + ' was removed')
    } else {
      res.send('The file was not found or you do not have permission to delete it')
    }

  })
})

// Adds a tag to the post
router.post('/addTag/:postId', function (req, res) {
  Post.findById(req.params.postId, function (err, thePost) {
    console.log(req.body.tag)
    thePost.tags.push(req.body.tag)
    thePost.save();
    res.send(thePost)
  })
})

// Will search for posts by tag
router.post('/findByTag', function (req, res) {
  Post.find({
    "tags": req.body.tag
  }, function (err, result) {
    console.log(result)
    if (err) res.send(err);
    if (result.length === 0) res.send('That tag was not found');
    else {
      res.send(result);
    }
  })
});


// This will return the populated array of "comments" for that post
// and also populate the "author" field for each of those comments
router.get('/comments/:postId', function (req, res) {
  Post.findById(req.params.postId)
    .populate({
      path: 'comments',
      populate: {
        path: 'author'
      }
    })
    .exec(function (err, data) {
      err ? res.status(401).send(err) : res.send(data)
    })
});


router.get('/submit/:mail', function (req, res) {
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
    } else {
      res.status('submitted').send({
        email: req.params.mail
      });
    }
  });

});


module.exports = router;