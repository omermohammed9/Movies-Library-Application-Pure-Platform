// likeModel.js
const db = require('../config/db');

// Helper function to add a like for a movie
const addLike = (movieId) => {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO Likes (movie_id) VALUES (?)`;
        db.run(sql, [movieId], function (err) {
            if (err) {
                return reject(err);
            }
            resolve();  // Resolve when the like is inserted
        });
    });
};

// Helper function to get the number of likes for a movie
const getLikeCount = (movieId) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT COUNT(*) as likeCount FROM Likes WHERE movie_id = ?`;
        db.get(sql, [movieId], (err, row) => {
            if (err) {
                return reject(err);
            }
            resolve(row.likeCount);  // Resolve with the count of likes
        });
    });
};

module.exports = { addLike, getLikeCount };