var express = require('express');
var router = express.Router();
var Post = require('../models/postSchema');
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



module.exports = router;
