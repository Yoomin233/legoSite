var express = require('express');
var router = express.Router();

const User = require('../models/userModel')

/* users router */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.post('/login', async (req, res, next) => {
  let searchResult = await User.findOne({username: req.body.username})
  let respObject
  if (!searchResult) {
    respObject = {
      code: -1,
      message: '用户不存在'
    }
  } else {
    if (searchResult.password === req.body.password) {
      respObject = {
        code: 1,
        message: "success"
      }
    } else {
      respObject = {
        code: -1,
        message: '密码错误!'
      }
    }
  }
  res.json(respObject)
})

router.post('/register', async (req, res, next) => {
  let oldUser = await User.findOne({username: req.body.username})
  if (oldUser) {
    res.json({
      code: -1,
      message: '用户名已经存在'
    })
  } else {
    try {
      let newUser = new User({
        username: req.body.username,
        password: req.body.password
      })
      let saveResult = await newUser.save()
      res.json({
        code: 1,
        message: 'success',
        data: saveResult
      })
    } catch (e) {
      next(e)
    }
  }
})

module.exports = router;
