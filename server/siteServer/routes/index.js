var express = require('express');
var router = express.Router();

const title = '我的站点'

/* GET home page. */
router.get('/', function(req, res, next) {
  let sess = req.session
  // 已经登录
  // console.log(req.session)
  if (sess.user) {
    res.render('index', {
      title,
      user: sess.user
    })
  // 尚未登录
  } else {
    res.render('index', {
      title
    })
  }
});

module.exports = router;
