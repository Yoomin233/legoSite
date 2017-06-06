var express = require('express')
var router = express.Router()
// var session = require('express-session')

let user = {
  username: 'hym92',
  password: 'hym92'
}

// router.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true
// }))

// login page
router.get('/', (req, res, next) => {
  res.render('session/index', {title: 'Index Page'})
})

// login success
router.get('/admin', (req, res, next) => {
  let sess = req.session
  if (!sess.views) sess.views = 0
  if (sess.username) {
    sess.views ++
    res.render('session/admin', {title: 'Admin Center', username: sess.username, views: sess.views})
  } else {
    res.redirect('/sessionDemo')
  }
})

// post login request
router.post('/login', (req, res) => {
  // let sess = req.session
  // sess.email = req.body.email
  let sess = req.session
  if (req.body.username === user.username && req.body.password === user.password) {
    sess.username = req.body.username
    res.redirect('/sessionDemo/admin')
  } else {
    res.end('username / password error')
  }
})

// get logout request
router.post('/logout', (req, res) => {
  req.session.destroy((err) => res.redirect('/sessionDemo'))
})

module.exports = router
