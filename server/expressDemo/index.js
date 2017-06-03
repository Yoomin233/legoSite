const express = require('express')
const app = express()

const cool = require('cool-ascii-faces')

const about = require('./about')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// middlewares. Whereas route functions end the HTTP request-response cycle by returning some response to the HTTP client, middleware functions typically perform some operation on the request or response and then call the next function in the "stack", which might be more middleware or a route handler.
// use app.use or app.add to add middleware functions
const morgan = require('morgan');
app.use(morgan('dev'))

// router demo module
// this is /about router!
app.use('/about', (req, res, next) => {
  // console.log('processing \'about\'!')
  next()
})
app.use('/about', about)

// use static server...
app.use('/static', express.static('public'))
// multiple calls...
// app.use('/static', express.static('anotherDir'))

// error handling. must be the last middleware used
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('something went wrong')
})

// template rendering, call res.render(templateFileName, data) to render
// app.get('/', function(req, res) {
//   res.render('index', { title: 'About dogs', message: 'Dogs rock!' });
// });

app.listen(3202, () => console.log(`listening!${cool()}`))
