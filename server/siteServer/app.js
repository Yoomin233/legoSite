var express = require('express');
var path = require('path');

// middlewares
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session')
var MongoStore = require('connect-mongo')(session)

var cors = require('cors')
var compression = require('compression')

var index = require('./routes/index');
var users = require('./routes/users');
var lego = require('./routes/lego');
var blog = require('./routes/blog');
var user = require('./routes/user')

var app = express();

const mongodbAddr = process.env.NODE_ENV === 'production' ? 'mongodb://localhost:10220' : 'mongodb://47.94.196.246:10220'

// connecting to db
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect(mongodbAddr)
const db = mongoose.connection
db.once('open', () => console.log(`mongodb connected!, env: ${process.env.NODE_ENV}`))
db.on('error', console.error.bind(console, 'MongoDB connection errr:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression())
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  httpOnly: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}))
app.use(cors())

app.use(express.static(path.join(__dirname, 'public')))
app.use('/lego', express.static(path.join(__dirname, 'public/lego')))

app.use('/users', users);
app.use('/', index);

app.use('/api/lego', lego)
app.use('/api/blog', blog)
app.use('/api/user', user)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
