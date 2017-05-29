const mongoose = require('mongoose')
const config = require('./config')
const { Kitten } = require('./schema')

mongoose.connect(`${config.db}/test`)
const dbInstance = mongoose.connection
dbInstance.once('open', () => console.log('connected!'))

// this creates an model's instance - document
let tobby = new Kitten({
  name: 'sansei',
  breed: 'tobby Cat'
})

// tobby.save((err, tobby) => {
//   if (err) return console.log(err)
//   // tobby.speak()
//   console.log(tobby)
// })

// Kitten.find({name: 'tobby'}, (err, data) => console.log(data))
// console.log(tobby.fullInfo);
