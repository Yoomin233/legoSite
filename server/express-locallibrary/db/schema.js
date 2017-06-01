const mongoose = require('mongoose')
const Schema = mongoose.Schema


const someSchema = new Schema({
  a_string:     String,
  a_date:       Date
})

const breakfastSchema = new Schema({
  eggs: {
    type: Number,
    min: [6, 'too few eggs!'],
    max: 12,
    required: [true, 'why no bacon?']
  },
  drink: {
    type: String,
    enum: ['Coffee', 'Tea', 'Water']
  }
})

// arguments: modelName, schemaName
exports.someModel = mongoose.model('someModel', someSchema)
exports.breakfastModel = mongoose.model('breakfastModel', breakfastSchema)

// define ObjectId and ref (to associate models)
const authorSchema = new Schema({
  name: String,
  stories: [{
    type: Schema.Types.ObjectId,
    ref: 'Story'
  }]
})

const storySchema = new Schema({
  title: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Author'
  }
})

const Author = mongoose.model('Author', authorSchema)
const Story = mongoose.model('Story', storySchema)

exports.Author = Author
exports.Story = Story
