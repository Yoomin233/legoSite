const mongoose = require('mongoose')
mongoose.Promise = global.Promise

mongoose.connect('mongodb://yuemin:yuemin@ds157971.mlab.com:57971/mongo')
const db = mongoose.connection

db.once('open', () => console.log('connected!'))

const {someModel, breakfastModel} = require('./schema')

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
