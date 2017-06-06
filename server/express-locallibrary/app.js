var express = require('express');
var path = require('path');

/* middlewares */
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator')
var compression = require('compression')
var helmet = require('helmet')
var session = require('express-session')
var MongoStore = require('connect-mongo')(session)

/* routes */
var index = require('./routes/index');
var users = require('./routes/users');
var catalog = require('./routes/catalog')
var sessionDemo = require('./routes/sessionDemo')

var app = express();

const mongoose = require('mongoose')
mongoose.Promise = global.Promise

mongoose.connect('mongodb://yuemin:yuemin@ds157971.mlab.com:57971/mongo')
const db = mongoose.connection

db.once('open', () => console.log(`mongodb connected!, env: ${process.env.NODE_ENV}`))
db.on('error', console.error.bind(console, 'MongoDB connection errr:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(helmet())
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
// body parser used to read POST parameters
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// populate cookie to req.cookies
// app.use(cookieParser());

app.use(compression())
app.use(expressValidator())

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({
    mongooseConnection: db
  })
}))

// static files, served from '/'
app.use(express.static(path.join(__dirname, 'public')));

// route function to forward the supported requests and additional info to the appropriate controller functions
app.use('/', index);
app.use('/users', users);
app.use('/catalog', catalog)
app.use('/sessionDemo', sessionDemo)

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

// mongoose is a mongodb object modeling tool (ORM/ODM)

// connect to mongodb database

module.exports = app;
