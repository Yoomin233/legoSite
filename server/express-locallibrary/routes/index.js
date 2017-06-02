var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // redirect by sending status code 302 and 'location' field in response headers
  res.redirect('/catalog')
  // res.render('index', { title: 'Express' });
});

module.exports = router;
