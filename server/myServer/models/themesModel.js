const mongoose = require('mongoose')
const Schema = mongoose.Schema

const themesSchema = Schema({
  cnName: {
    type: String,
    required: true
  },
  engName: {
    type: String,
    default: ''
  }
})

module.exports = mongoose.model('themesModel', themesSchema)
