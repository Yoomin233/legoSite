var express = require('express');
var router = express.Router();

/* GET /users listing. */
// controller function to get the data from the models, render the HTML page based on the view(templates) and model(data), and return to the user.
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/userCenter', (req, res, next) => {
  res.send('this is user center')
})

router.get('/:userId', (req, res, next) => {
  console.log(req.params.userId)
  res.render('users', {user: req.params.userId})
})

module.exports = router;
