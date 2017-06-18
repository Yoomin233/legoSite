var express = require('express');
var router = express.Router();
const userModel = require('../models/userModel')

router.get('/', (req, res, next) => {
  let sess = req.session
  // 已经登陆的情况, jurisdiction3为超级管理员
  try {
    if (sess.user) {
      res.json({
        code: 1,
        username: sess.user.username,
        jurisdiction: sess.user.jurisdiction,
      })
      // 游客登陆
    } else {
      res.json({
        code: 1,
        username: '游客',
        jurisdiction: 1
      })
    }
  } catch (e)  {
    next(e)
  }
})

router.get('/getTemp', (req, res, next) => {
  userModel.findOneAndUpdate({
    username: 'hymin'
  }, {
    jurisdiction: 3
  })
  .exec()
  .then((result) => res.send(result))
})

module.exports = router
