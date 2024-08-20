// likeRoutes.js
const express = require('express');
const router = express.Router();
const { likeMovie, getMovieLikeCount } = require('../controllers/likeController');

// Route to like a movie
router.post('/movies/:movieId/like', likeMovie);

// Route to get the like count for a movie
router.get('/movies/:movieId/likes', getMovieLikeCount);

module.exports = router;
