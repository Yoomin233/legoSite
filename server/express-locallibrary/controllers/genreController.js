var Genre = require('../models/genre');
const Book = require('../models/book')

// Display list of all Genre
exports.genre_list = async function(req, res) {
  let genreList = await Genre.find().sort([['name', 'ascending']]).exec()
  res.render('./catalog/genreList', {title: 'Genre List', genreList})
};

// Display detail page for a specific Genre
exports.genre_detail = async function(req, res) {
  let results = await Promise.all([Genre.findById(req.params.id).exec(), Book.find({'genre': req.params.id}).exec()])
  res.render('./catalog/genreDetail', {title: 'Genre Detail', genre: results[0], genre_books: results[1]})
};

// Display Genre create form on GET
exports.genre_create_get = function(req, res) {
    res.render('catalog/genre_form', {title: 'Create Genre'})
};

// Handle Genre create on POST
exports.genre_create_post = async function(req, res) {
  /* validate form fields */
  req.checkBody('name', 'Genre name required').notEmpty()
  req.sanitize('name').escape()
  req.sanitize('name').trim()

  let errors = req.validationErrors()

  let genre = new Genre({
    name: req.body.name
  })

  if (errors) {
    return res.render('catalog/genre_form', {title: 'Create Genre', genre, errors})
  } else {
    let findGenre = await Genre.findOne({'name': req.body.name}).exec()
    if (findGenre) {
      res.redirect(findGenre.url)
    } else {
      let newGenre = await genre.save()
      res.redirect(newGenre.url)
    }
  }
};

// Display Genre delete form on GET
exports.genre_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre delete GET');
};

// Handle Genre delete on POST
exports.genre_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre delete POST');
};

// Display Genre update form on GET
exports.genre_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre update GET');
};

// Handle Genre update on POST
exports.genre_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre update POST');
};
