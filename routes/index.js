var express = require('express');
var router = express.Router();
var User = require('../models/userSchema');

router.get('/everything', function (req, res) {
  User.find({})
    .populate("posts")
    .exec(function (err, data) {
      err ? res.status(401).send(err) : res.send(data)
    })
})

module.exports = router;