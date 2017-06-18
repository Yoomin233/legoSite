const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = Schema({
  username: {
    type: String,
    required: true,
    max: 100
  },
  password: {
    type: String,
    required: true,
    max: 100
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  jurisdiction: {
    type: Number,
    required: true,
    enum: [1, 2, 3],
    default: 1
  }
})

module.exports = mongoose.model('userModel', UserSchema)
