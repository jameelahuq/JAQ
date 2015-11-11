var express = require('express');
var router = express.Router();
var User = require('../models/userSchema');
var Post = require('../models/postSchema');


//Get all posts and populate with author's details
router.get('/getPosts',function (req,res){
  Post.find({})
  .populate('author')
  .exec(function (err, data){
    err ? res.status(401).send(err) : res.send(data)
  })
});


// Add a new post and push that posts reference into
// the users "posts" array
router.post('/addPost', function(req,res){
  Post.create({
    author: req.user._id,
    thePost:req.body.thePost,
    likes: req.body.likes,
    comments: req.body.comments,
    title: req.body.title,
    tags:req.body.tags
  }, function(err,data){
    if (err){
      res.send(err)
    } 
    User.findByIdAndUpdate(req.user._id ,{$push:{
      'posts':data._id}
    }, function(err,user){
      if(err) res.send(err);
      user.save();
    })
    res.send(data);
  })
})


// Like a post
router.post('/likedPost/:liked', function(req,res){
  Post.findById(req.params.liked,function(err,postLiked){
    postLiked.likeIt();
    postLiked.save(function(err,savedTask){
      res.send(savedTask)
    })
  });
})


// Delete a post
router.delete('/removePost/:postId/:userId', function(req,res){
  Post.findById(req.params.postId, function(err,data){
    if (data && data.author == req.params.userId){
      data.remove();
      data.save();
      res.send(data + ' was removed')
    }else{
      res.send('The file was not found or you do not have permission to delete it')
    }
  })
})

// Get a post's comments.
router.get('/comments/:postId',function(req,res){
  Post.findById(req.params.postId)
  .populate('comments')
  .exec(function (err, data){
    err ? res.status(401).send(err) : res.send(data.comments)
  })
})

// Add a tag to a post
router.post('/addTag/:postId',function(req,res){
  Post.findById(req.params.postId, function(err, thePost){
    console.log(req.body.tag)
    thePost.tags.push(req.body.tag)
    thePost.save();
    res.send(thePost)
  })
})

// Find a post by any of the tags in its "tags" array
router.post('/findByTag',function (req,res){
  Post.find({"tags":req.body.tag}, function(err,result){
    console.log(result)
    if(err) res.send(err);
    if(result.length === 0) res.send('That tag was not found');
    else {
      res.send(result);
    }
  })
})

module.exports = router;

