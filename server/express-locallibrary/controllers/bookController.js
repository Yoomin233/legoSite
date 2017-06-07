var Book = require('../models/book');
var Author = require('../models/author');
var Genre = require('../models/genre');
var BookInstance = require('../models/bookinstance');

const marked = require('marked')
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
});

const fs = require('fs-extra')

exports.tester = async function (req, res, next) {
  try {
    let markdownContent = await fs.readFile('markdown/notes.md', 'utf8')
    res.send(marked(markdownContent))
  } catch (e) {
    next(e)
  }
}

exports.index = async function(req, res) {
  try {
    let results = await Promise.all([Book.count(), BookInstance.count(),  BookInstance.count({status:'Available'}), Author.count(), Genre.count()])
    res.render('./catalog/catalogIndex', {title:'Local Libraty Home', data: results})
  } catch (err) {
    res.render('./catalog/catalogIndex', {title:'Local Libraty Home', error:err})
  }
};

// Display list of all books
exports.book_list = async function(req, res) {
    let bookList = await Book.find({}, 'title author').populate('author').exec()
    res.render('./catalog/book_list', {title: 'Book List', bookList})
};

// Display detail page for a specific book
exports.book_detail = async function(req, res) {
  let result = await Promise.all([Book.findById(req.params.id).populate('author').populate('genre').exec(), BookInstance.find({'book': req.params.id}).exec()])
  res.render('./catalog/bookDetail', {title: 'Book Title', book: result[0], bookInstances: result[1]})
};

// Display book create form on GET
exports.book_create_get = async function(req, res) {
  let [authors, genres] = await Promise.all([Author.find(), Genre.find()])
  res.render('catalog/book_form', {title: 'Creat Book', authors, genres})
};

// Handle book create on POST
exports.book_create_post = async function(req, res) {
    req.checkBody('title', 'Title must not be empty').notEmpty()
    req.checkBody('author', 'Author must not be empty').notEmpty()
    req.checkBody('summary', 'Summary must not be empty').notEmpty()
    req.checkBody('isbn', 'ISBN must not be empty').notEmpty()

    req.sanitize('title').escape()
    req.sanitize('author').escape()
    req.sanitize('summary').escape()
    req.sanitize('isbn').escape()
    req.sanitize('title').trim()
    req.sanitize('author').trim()
    req.sanitize('summary').trim()
    req.sanitize('isbn').trim()
    req.sanitize('genre').escape()

    let book = new Book({
      title: req.body.title,
      author: req.body.author,
      summary: req.body.summary,
      isbn: req.body.isbn,
      genre: (typeof req.body.genre==='undefined' ? [] : req.body.genre)
    })

    let errors = req.validationErrors()
    if (errors) {
      let [authors, genres] = await Promise.all([Author.find(), Genre.find()])
      for (let i = 0; i < genres.length; i++) {
        if (book.genre.indexOf(genres[i]._id) > -1) {
          genres[i].checked = 'true'
        }
      }
      res.render('book_form', {title: 'Create Book', authors, genres, book, errors})
    } else {
      let newBook = await book.save()
      res.redirect(book.url)
    }
};

// Display book delete form on GET
exports.book_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Book delete GET');
};

// Handle book delete on POST
exports.book_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Book delete POST');
};

// Display book update form on GET
exports.book_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Book update GET');
};

// Handle book update on POST
exports.book_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Book update POST');
};
