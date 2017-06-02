const Author = require('./author')
let author1 = new Author({
  first_name: '22',
  family_name: '33',
  date_of_birth: Date.now(),
  date_of_death: Date.now()
})

const Genre = require('./genre')
let genre1 = new Genre({
  name: 'name'
})
console.log(genre1)
