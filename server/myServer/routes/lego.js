var express = require('express');
var router = express.Router();

const legoModel = require('../models/legoModel')
const themesModel = require('../models/themesModel')

// 获取全部set
router.get('/', async (req, res, next) => {
  let allSets = await legoModel.find({}).populate('theme')
  res.json(allSets)
})
// 增加新set
router.post('/', async (req, res, next) => {
  try {
    let newSet = new legoModel ({
      no: req.body.no,
      theme: req.body.theme,
      stock: req.body.stock,
      photos: JSON.parse(req.body.photos)
    })
    let saveResult = await newSet.save()
    res.json({
      code: 1,
      message: 'save success'
    })
  } catch (e) {
    next(e)
  }
})

// 修改set
router.put('/', async (req, res, next) => {
  // console.log(req.body)
  try {
    let updateResult = await legoModel.findOneAndUpdate({
      _id: req.body._id
    }, {
      no: req.body.no,
      theme: req.body.theme,
      stock: req.body.stock,
      photos: JSON.parse(req.body.photos)
    })
    // console.log(updateResult)
    res.json({
      code: 1,
      message: 'success'
    })
  } catch (e) {
    next(e)
  }
})

// 系列路由
router.get('/themes', async (req, res, next) => {
  let allThemes = await themesModel.find({})
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
