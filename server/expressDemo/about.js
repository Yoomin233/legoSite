const express = require('express');
const router = express.Router()

// get /about will go here
router.get('/', (req, res) => res.send('/about page!'))

// get /about/about
router.get('/about', (req, res) => res.send('about/about page!'))

module.exports = router
