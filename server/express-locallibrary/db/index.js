const mongoose = require('mongoose')
mongoose.Promise = global.Promise

mongoose.connect('mongodb://yuemin:yuemin@ds157971.mlab.com:57971/mongo')
const db = mongoose.connection

db.once('open', () => console.log('connected!'))

const {someModel, breakfastModel, Author, Story} = require('./schema')

// define and save a model instance
// let breakfast = new breakfastModel({
//   eggs: 10,
//   drink: 'Tea'
// })
//
// breakfast.save().then(breakfast => console.log(breakfast))

// find matching results, containing only specified fields
// breakfastModel.find({'drink': 'Coffee'}, 'eggs').then(result => console.log(result))

// find matching results using query object, chained query syntax
// breakfastModel.
//   find().
//   where('drink').equals('Tea').
//   where('eggs').gt(5).lt(15).
//   limit(5).
//   sort({drink: -1}).
//   select('drink').
//   exec().
//   then(res => console.log(res))
// find will find all matching objects, where findById, findOne, findByIdAndRemove , findByIdAndUpdate, findOneAndRemove, findOneAndUpdate count, methods only find limited number of results.

// breakfastModel.
//   find().
//   exec().
//   then(res => console.log(res))

// let bob = new Author({name: 'Bob Smith'})
// bob.save().then(res => {
//   var story = new Story({
//     title: 'Bob goes sledding',
//     author: bob._id
//   })
//   return story.save()
// })
// .then(res => console.log(res))

// use populate() to populate the area with actual information
// Story.findOne({title: 'Bob goes sledding'})
// .populate('author')
// .exec()
// .then(story => console.log(`the author is ${story.author.name}`))

// Author.findOne({name: 'Bob Smith'})
// .exec()
// .then(author => author._id)

// .then(_id => {
//   return Story.find({author: _id}).exec()
// })
// .then(story => console.log(story))

// .then(_id => {
//   let story = new Story({
//     title: 'Bob\'s second story',
//     author: _id
//   })
//   return story.save()
// })
// .then(story => console.log(story))

// use find() to find all records
// Story.find().exec().then(res => console.log(res))
