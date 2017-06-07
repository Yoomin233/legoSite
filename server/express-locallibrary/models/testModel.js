const mongoose = require('mongoose')
const Schema = mongoose.Schema

const testSchema = Schema({
  name: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('testModel', testSchema)
