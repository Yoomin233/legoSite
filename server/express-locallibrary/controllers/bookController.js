var Book = require('../models/book');
var Author = require('../models/author');
var Genre = require('../models/genre');
var BookInstance = require('../models/bookinstance');

const fs = require('fs')

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
exports.book_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Book detail: ' + req.params.id);
};

// Display book create form on GET
exports.book_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Book create GET');
};

// Handle book create on POST
exports.book_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Book create POST');
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
