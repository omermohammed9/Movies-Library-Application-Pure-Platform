const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

// Route to get all movies
router.get('/', movieController.getAllMovies);

// Route to get a single movie by ID
router.get('/:id', movieController.getMovieById);

// Route to create a new movie
router.post('/add', movieController.createMovie);

// Route to update an existing movie
router.put('/:id', movieController.updateMovie);

// Route to delete a movie
router.delete('/:id', movieController.deleteMovie);

module.exports = router;
