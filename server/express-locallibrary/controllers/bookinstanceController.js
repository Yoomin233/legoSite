var BookInstance = require('../models/bookinstance');
var Book = require('../models/book')

function testFunc () {
  return 'testString'
}

// Display list of all BookInstances
exports.bookinstance_list = async function(req, res) {
  let bookInstance = await BookInstance.find().populate('book').exec()
  res.render('./catalog/bookinstance_list', {title: 'Book Instance List', bookInstance, testFunc})
};

// Display detail page for a specific BookInstance
exports.bookinstance_detail = async function(req, res) {
  let bookInstance = await BookInstance.findById(req.params.id).populate('book').exec()
  res.render('./catalog/bookInstanceDetail', {title: 'Book: ', bookInstance})
    // res.send('NOT IMPLEMENTED: BookInstance detail: ' + req.params.id);
};

// Display BookInstance create form on GET
exports.bookinstance_create_get = function(req, res) {
    Book.find({}, 'title').exec()
    .then(books => {
      res.render('catalog/instance_form', {title: 'Create BookInstance', books})
    })
};

// Handle BookInstance create on POST
exports.bookinstance_create_post = function(req, res) {
  req.checkBody('book', 'Book must be specified').notEmpty(); //We won't force Alphanumeric, because book titles might have spaces.
  req.checkBody('imprint', 'Imprint must be specified').notEmpty();
  req.checkBody('due_back', 'Invalid date').optional({ checkFalsy: true }).isDate();

  req.sanitize('book').escape();
  req.sanitize('imprint').escape();
  req.sanitize('status').escape();
  req.sanitize('book').trim();
  req.sanitize('imprint').trim();
  req.sanitize('status').trim();
  req.sanitize('due_back').toDate();

  var bookinstance = new BookInstance({
      book: req.body.book,
      imprint: req.body.imprint,
      status: req.body.status,
      due_back: req.body.due_back
  });

  var errors = req.validationErrors();
  if (errors) {
    Book.find({},'title')
    .exec(function (err, books) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('bookinstance_form', { title: 'Create BookInstance', books, selected_book : bookinstance.book._id , errors, bookinstance });
    });
      return;
  } else {
    // Data from form is valid
    bookinstance.save(function (err) {
      if (err) { return next(err); }
      //successful - redirect to new book-instance record.
      res.redirect(bookinstance.url);
    });
  }
};

// Display BookInstance delete form on GET
exports.bookinstance_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: BookInstance delete GET');
};

// Handle BookInstance delete on POST
exports.bookinstance_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: BookInstance delete POST');
};

// Display BookInstance update form on GET
exports.bookinstance_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: BookInstance update GET');
};

// Handle bookinstance update on POST
exports.bookinstance_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: BookInstance update POST');
};
