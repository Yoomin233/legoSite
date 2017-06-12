var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
  res.json([
    {
      no: 42009,
      theme: 'Technic',
      stock: 2
    },
    {
      no: 42030,
      theme: 'Technic',
      stock: 2
    }
  ])
})

module.exports = router
