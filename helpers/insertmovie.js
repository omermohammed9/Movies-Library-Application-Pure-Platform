// Helper function to insert a movie
const db = require('../config/db');
const insertMovie = async (movieData) => {
    const { title, description, release_year, genre, director_id, image_url, youtube_url } = movieData;

    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO Movies (title, description, release_year, genre, director_id, image_url, youtube_url)
                     VALUES (?, ?, ?, ?, ?, ?, ?)`;
        db.run(sql, [title, description, release_year, genre, director_id, image_url, youtube_url], function (err) {
            if (err) {
                console.error("Error inserting movie:", err.message);
                return reject(err);
            }
            resolve(this.lastID);  // Return the inserted movie ID
        });
    });
};

module.exports = { insertMovie };