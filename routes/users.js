var express = require('express');
var router = express.Router();

/* GET users listing. */

router.get('/:field',function(req,res){
  User.findById(req.user._id)
      .populate(req.params.field)
      .exec(function (err, data){
        err ? res.status(401).send(err) : res.send(data[req.params.field])
      })
})

router.get('/id',function(req,res){
  User.findById(req.user._id)
      .exec(function (err, data){
        err ? res.status(401).send(err) : res.send(data)
      })
})

module.exports = router;
