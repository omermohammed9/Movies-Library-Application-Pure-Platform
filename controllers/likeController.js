// likeController.js
const { addLike, getLikeCount } = require('../models/likeModel');

// Controller function to handle liking a movie
const likeMovie = async (req, res) => {
    const { movieId } = req.params;

    try {
        // Add a like for the movie
        await addLike(movieId);

        // Get the updated like count
        const updatedLikeCount = await getLikeCount(movieId);

        res.json({ likeCount: updatedLikeCount });
    } catch (error) {
        console.error("Error liking movie:", error.message);
        res.status(500).json({ error: 'Error liking movie' });
    }
};

// Controller function to get the like count for a movie
const getMovieLikeCount = async (req, res) => {
    const { movieId } = req.params;

    try {
        const likeCount = await getLikeCount(movieId);
        res.json({ likeCount });
    } catch (error) {
        console.error("Error fetching like count:", error.message);
        res.status(500).json({ error: 'Error fetching like count' });
    }
};

module.exports = { likeMovie, getMovieLikeCount };
