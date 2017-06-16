const mongoose = require('mongoose')
const Schema = mongoose.Schema

const legoSchema = Schema({
  no: {
    type: Number,
    required: true,
  },
  theme: {
    type: String,
    require: true,
    default: ''
  },
  stock: {
    type: Number
  },
  photo: [
    {
      url: {
        type: String,
        required: true
      },
      desc: {
        type: String,
        default: ''
      }
    }
  ]
})

module.exports = mongoose.model('legoModel', legoSchema)
