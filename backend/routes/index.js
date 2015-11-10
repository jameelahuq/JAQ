var express = require('express');
var router = express.Router();
var Mailgun = require('mailgun-js');
var config = require('../config.js');


// require the mongoose schemas
var Post = require('../models/postSchema');
var Comment = require('../models/commentSchema');
var User = require('../models/userSchema');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// post routes \\

router.get('/getPosts', function(req,res){
  Post.find({}, function(err,data){
    if(err){res.send(err)};
    res.send(data)
  })
})

router.post('/addPost/:authorId', function(req,res){
  Post.create({
    author: req.params.authorId,
    thePost:req.body.thePost,
    likes: req.body.likes,
    comments: req.body.comments,
    title: req.body.title
  }, function(err,data){
    if (err){
      res.send(err)
    } 
    User.findByIdAndUpdate(req.params.authorId ,{$push:{
      'posts':data._id}
    }, function(err,user){
      if(err) res.send(err);
      user.save();
    })
    res.send(data);
  })
})

router.post('/likedPost/:liked', function(req,res){
  Post.findById(req.params.liked,function(err,postLiked){
    postLiked.likeIt();
    postLiked.save(function(err,savedTask){
      res.send(savedTask)
    })
  });
})

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


router.post('/addTag/:postId',function(req,res){
  Post.findById(req.params.postId, function(err, thePost){
    console.log(req.body.tag)
    thePost.tags.push(req.body.tag)
    thePost.save();
    res.send(thePost)
  })
})

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

// comment routes \\

router.post('/likedComment/:liked', function(req,res){
  Comment.findById(req.params.liked,function(err,commentLiked){
    commentLiked.likeIt();
    commentLiked.save(function(err,savedTask){
      res.send(savedTask)
    })
  });
})

router.delete('/removeComment/:commentId/:userId', function(req,res){
//   Comment.pre('remove', function(next) {
//     // Remove all the assignment docs that reference the removed person.
//     this.model('Post').remove({ comment: this._id }, next);
// });
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
/////////EXPERIMENT//////


// user routes \\

router.post('/addUser', function(req, res){
  User.create({
    name: req.body.name
  }, function(err,user){
    if(err) res.send(err)
      res.send(user);
  })
})

router.get('/submit/:mail', function(req,res) {
    var mailgun = new Mailgun({
      apiKey: config.MAILGUN_KEY, 
      domain: config.MAILGUN_DOMAIN
    });

    var data = {
      from: 'Andy@gmail.org',
      to: req.params.mail, 
      subject: 'Hello from Mailgun',
      html: 'This is pretty cool'
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
