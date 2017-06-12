var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
  res.send(req.session)
})

module.exports = router
