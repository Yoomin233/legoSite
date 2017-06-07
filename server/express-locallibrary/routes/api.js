var express = require('express')
var router = express.Router()

var testModel = require('../models/testModel')

router.get('/', (req, res, next) => {
  res.render('apiTester')
})

router.get('/get', (req, res, next) => {
  res.send('hehea')
})

module.exports = router
