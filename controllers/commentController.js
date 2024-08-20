const commentModel = require('../models/commentModel');

// Handle adding a new comment to a movie
const addComment = (req, res) => {
    const { movieId } = req.params;
    const { comment } = req.body;

    if (!comment || comment.trim() === '') {
        return res.status(400).json({ error: 'Comment cannot be empty' });
    }

    commentModel.insertComment(movieId, comment)
        .then((newComment) => {
            res.json({ message: 'Comment added successfully', comment: newComment });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'Failed to add comment' });
        });
};

// Handle fetching comments for a specific movie
const getMovieComments = (req, res) => {
    const { movieId } = req.params;

    commentModel.getCommentsByMovieId(movieId)
        .then((comments) => {
            res.json(comments);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'Failed to fetch comments' });
        });
};

module.exports = {
    addComment,
    getMovieComments
};
