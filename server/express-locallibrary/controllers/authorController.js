var Author = require('../models/author');
var Book = require('../models/book')

// Display list of all Authors
exports.author_list = async function(req, res, next) {
  try {
    let authorList = await Author.find().sort([['family_name', 'ascending']]).exec()
    // res.send('223')
    res.render('./catalog/author_list', {title: 'Author List', authorList})
  } catch (e) {
    next(e)
  }
};

// Display detail page for a specific Author
exports.author_detail = async function(req, res) {
  let result = await Promise.all([Author.findById(req.params.id).exec(), Book.find({'author': req.params.id}, 'title summary').exec()])
  res.render('./catalog/authorDetail', {title: 'Author Detail', author: result[0], authorBooks: result[1] })
};

// Display Author create form on GET
exports.author_create_get = function(req, res) {
    res.render('catalog/author_form', {title: 'Create Author'});
};

// Handle Author create on POST
exports.author_create_post = async function(req, res) {
    req.checkBody('first_name', 'First name must be specified').notEmpty()
    req.checkBody('family_name', 'Family name must be specified.').notEmpty();
    req.checkBody('family_name', 'Family name must be alphanumeric text.').isAlpha();
    req.checkBody('date_of_birth', 'Invalid date').optional({ checkFalsy: true }).isDate();
    req.checkBody('date_of_death', 'Invalid date').optional({ checkFalsy: true }).isDate();

    req.sanitize('first_name').escape();
    req.sanitize('family_name').escape();
    req.sanitize('first_name').trim();
    req.sanitize('family_name').trim();
    req.sanitize('date_of_birth').toDate();
    req.sanitize('date_of_death').toDate();

    var errors = req.validationErrors();

    let author = new Author({
      first_name: req.body.first_name,
      family_name: req.body.family_name,
      date_of_birth: req.body.date_of_birth,
      date_of_death: req.body.date_of_death
    })

    if (errors) {
      return res.render('author_form', {title: 'Create Author', author, errors})
    } else {
      let newAuthor = await author.save()
      res.redirect(newAuthor.url)
    }
};

// Display Author delete form on GET
exports.author_delete_get = async function(req, res) {
  let [author, author_books] = await Promise.all([Author.findById(req.params.id).exec(), Book.find({'author': req.params.id}).exec()])
  res.render('catalog/author_delete', {title: 'Delete Author', author, author_books})
};

// Handle Author delete on POST
exports.author_delete_post = async function(req, res) {
  req.checkBody('authorid', 'Author id must exost').notEmpty()
  let [author, author_books] = await Promise.all([Author.findById(req.body.authorid).exec(), Book.find({'author': req.body.authorid}, 'title summary').exec()])
  if (author_books.length) {
    res.render('catalog/author_delete', {title: 'Author has books', author, author_books})
    return
  } else {
    Author.findByIdAndRemove(req.body.authorid)
    .then(() => res.redirect('/catalog/authors'))
  }
};

// Display Author update form on GET
exports.author_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Author update GET');
};

// Handle Author update on POST
exports.author_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Author update POST');
};
