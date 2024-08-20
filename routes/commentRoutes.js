const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// Route to add a comment
router.post('/movies/:movieId/comments', commentController.addComment);

// Route to fetch comments for a movie
router.get('/movies/:movieId/comments', commentController.getMovieComments);

module.exports = router;
