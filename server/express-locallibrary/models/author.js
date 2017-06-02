const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AuthorSchema = Schema({
  first_name: {
    type: String,
    required: true,
    max: 100
  },
  family_name: {
    type: String,
    required: true,
    max: 100
  },
  date_of_birth: {
    type: Date
  },
  date_of_death: {
    type: Date
  }
})

// virtual properties
AuthorSchema.virtual('fullname')
.get(function () {
  return `${this.family_name} ${this.first_name}`
})
AuthorSchema.virtual('url')
.get(function () {
  return `/catalog/author/${this._id}`
})

module.exports = mongoose.model('Author', AuthorSchema)
