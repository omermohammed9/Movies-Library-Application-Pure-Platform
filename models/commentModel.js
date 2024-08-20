const db = require('../config/db');

// Insert a new comment into the database
const insertComment = (movieId, comment) => {
    const createdAt = Date.now(); // Use Unix timestamp for simplicity
    return new Promise((resolve, reject) => {
        db.run(
            `INSERT INTO Comments (movie_id, comment, created_at) VALUES (?, ?, ?)`,
            [movieId, comment, createdAt],
            function (err) {
                if (err) {
                    console.error("Error inserting comment:", err.message);
                    return reject(err);
                }
                resolve({ id: this.lastID, movie_id: movieId, comment, created_at: createdAt });
            }
        );
    });
};

// Fetch comments for a specific movie
const getCommentsByMovieId = (movieId) => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM Comments WHERE movie_id = ? ORDER BY created_at DESC`, [movieId], (err, rows) => {
            if (err) {
                console.error("Error fetching comments:", err.message);
                return reject(err);
            }
            resolve(rows);
        });
    });
};

module.exports = {
    insertComment,
    getCommentsByMovieId
};
