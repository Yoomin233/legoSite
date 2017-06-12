var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
  res.json([
    {
      no: 42009,
      theme: 'Technic',
      stock: 2,
      images: [
        {
          url:'https://sh-s7-live-s.legocdn.com/is/image//LEGO/42009_alt6?$main$'
        },
        {
          url: 'https://sh-s7-live-s.legocdn.com/is/image//LEGO/42009_alt5?$main$'
        }
      ]
    },
    {
      no: 42030,
      theme: 'Technic',
      stock: 2,
      images: [
        {
          url:'https://sh-s7-live-s.legocdn.com/is/image//LEGO/42030_alt5?$main$'
        },
        {
          url: 'https://sh-s7-live-s.legocdn.com/is/image//LEGO/42030_alt6?$main$'
        }
      ]
    },
    {
      no: 42043,
      theme: 'Technic',
      stock: 2,
      images: [
        {
          url:'https://sh-s7-live-s.legocdn.com/is/image//LEGO/42043_alt1?$main$'
        },
        {
          url: 'https://sh-s7-live-s.legocdn.com/is/image//LEGO/42043_alt2?$main$'
        }
      ]
    }
  ])
})

module.exports = router
