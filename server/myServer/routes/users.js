var express = require('express');
var router = express.Router();

const User = require('../models/userModel')

/* users router */

// 登录动作
router.post('/login', async (req, res, next) => {
  let findUser = await User.findOne({username: req.body.username})
  let respObject
  let sess = req.session
  if (!findUser) {
    respObject = {
      code: -1,
      message: '用户不存在'
    }
  } else {
    if (findUser.password === req.body.password) {
      // 登录成功后, 附加session相关信息
      sess.user = findUser
      console.log(sess)
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

// 注册动作
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

// 注销动作
router.get('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      next(err)
    } else {
      res.redirect('/')
    }
  })
})

module.exports = router;
