var express = require('express');
var router = express.Router();

const legoModel = require('../models/legoModel')
const themesModel = require('../models/themesModel')

router.get('/', (req, res, next) => {
  res.json([
    {
      no: 42009,
      theme: '科技(Technic)',
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
      theme: '科技(Technic)',
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
      theme: '科技(Technic)',
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

router.get('/themes', async (req, res, next) => {
  let allThemes = await themesModel.find()
  res.json(allThemes)
})

router.post('/themes', async (req, res, next) => {
  let existingTheme = await themesModel.findOne({cnName: req.body.cnName})
  // 如果主题已经存在
  if (existingTheme) {
    res.json({
      code: -1,
      message: '系列已经存在'
    })
  } else {
    try {
      let newTheme = new themesModel({
        cnName: req.body.cnName,
        engName: req.body.engName
      })
      let saveResult = await newTheme.save()
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

module.exports = router
