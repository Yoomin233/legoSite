const mongoose = require('mongoose')

let kittySchema = mongoose.Schema({
  name: String,
  breed: {
    type: String,
    unique: true
  }
})
// you can also set schema options
// new Schema({}, options)

// instance methods
kittySchema.methods.speak = function () {
  let greeting = this.name ? `Meow name is ${this.name}` : 'I dont have a name'
  console.log(greeting)
}

// schema's static methods
kittySchema.statics.findByName = function (name, cb) {
  return this.find({
    name: new RegExp(name, 'i')
  }, cb)
}

// mongoose query functions
// kittySchema.query.byName = function (name. cb) {
  // return this.find({
  //   // some codes...
  // })
// }

// virtual properties
kittySchema.virtual('fullInfo').get(function () {
  return `${this.name}, ${this.breed}`
})

// a model is a class with which we construct documents.
let Kitten = mongoose.model('Kitten', kittySchema)

exports.Kitten = Kitten
