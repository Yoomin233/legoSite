const mongoose = require('mongoose')
const Schema = mongoose.Schema

const legoSchema = Schema({
  no: {
    type: Number,
    required: true,
  },
  theme: {
    type: Schema.ObjectId,
    ref: 'themesModel',
    required: true
  },
  stock: {
    type: Number
  },
  photos: [
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
