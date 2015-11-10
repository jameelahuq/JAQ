var express = require('express');
var router = express.Router();


// require the mongoose schemas
var Post = require('../models/postSchema');
var Comment = require('../models/commentSchema');
var User = require('../models/userSchema');





/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/addPost', function(req,res){
  Post.create({
    likes: req.body.likes,
    comments: req.body.comments,
    title: req.body.title
  }, function(err,data){
    if (err){
      res.send(err)
    }
    res.send(data);
  })

})

router.post('/likedIt/:liked', function(req,res){
  Post.findById(req.params.liked,function(err,postLiked){
    postLiked.likeIt();
    postLiked.save(function(err,savedTask){
      res.send(savedTask)
    })

  });
})


router.post('/addComment/:userId', function(req, res){
  Comment.create({
    author: req.params.userId,
    text: req.body.text
  }, function(err,comment){
    if(err) res.send(err);
      res.send(comment)
  }) 


})


router.post('/addUser', function(req, res){
  User.create({
    name: req.body.name
  }, function(err,user){
    if(err) res.send(err)
    res.send(user);
  })

})


module.exports = router;
