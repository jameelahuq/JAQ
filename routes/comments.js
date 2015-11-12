var express = require('express');
var router = express.Router();
var Post = require('../models/postSchema');
var Comment = require('../models/commentSchema');
var User = require('../models/userSchema');


// This takes a comment id and returns the comment with fully populated
// "author" and "comments" fields
router.get('/:commentId', function (req, res) {
  Comment.findById(req.params.commentId)
    .populate('author')
    .populate('comments')
    .exec(function (err, data) {
      console.log(data)
      err ? res.status(401).send(err) : res.send(data)
    })
})


//This takes a comment id and the id of the author that wrote it and removes
// that comment.
router.delete('/removeComment/:commentId/:userId', function (req, res) {
  Comment.findById(req.params.commentId, function (err, data) {
    if (data && data.author == req.params.userId) {
      data.remove();
      data.save();
      res.send(data + ' was removed')
    } else {
      res.send('The file was not found or you do not have permission to delete it')
    }
  })
})

// This takes a comment id and increments the "liked" field of that comment
router.post('/likedComment/:liked', function (req, res) {
  Comment.findById(req.params.liked, function (err, commentLiked) {
    commentLiked.likeIt();
    commentLiked.save(function (err, savedTask) {
      res.send(savedTask)
    })
  });
})

// Creates a new comments and pushes the comment id into both the post's
// "comments" array and the users "comments" array.
router.post('/addComment/:postId', function (req, res) {
  Comment.create({ //
    author: req.user._id, //need to associate with a post
    text: req.body.text //
  }, function (err, comment) {
    if (err) res.send(err);
    User.findByIdAndUpdate(req.user._id, {
      $push: {
        'comments': comment._id
      }
    }, function (err, user) {
      Post.findByIdAndUpdate(req.params.postId, {
        $push: {
          'comments': comment._id
        }
      }, function (err, thePost) {
        if (err) res.send(err);
        thePost.save();
        user.save();
      })
    })
    res.send(comment)
  })
})

module.exports = router;