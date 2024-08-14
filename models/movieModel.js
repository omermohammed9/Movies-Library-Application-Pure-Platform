//const db = require('../config/db');

const db = require('../config/initDb');


// Function to retrieve all movies
const getAllMovies = (callback) => {
    const sql = `SELECT Movies.*, Directors.name as director_name 
                 FROM Movies 
                 LEFT JOIN Directors ON Movies.director_id = Directors.id`;

    db.all(sql, [], (err, rows) => {
        callback(err, rows);
    });
};

// Function to retrieve a movie by its ID
const getMovieById = (id, callback) => {
    const sql = `SELECT Movies.*, Directors.name as director_name 
                 FROM Movies 
                 LEFT JOIN Directors ON Movies.director_id = Directors.id 
                 WHERE Movies.id = ?`;

    db.get(sql, [id], (err, row) => {
        callback(err, row);
    });
};



// Function to create a new movie
const createMovie = (movieData, callback) => {
    const { title, description, release_year, genre, director_id, image_url } = movieData;
    const sql = `INSERT INTO Movies (title, description, release_year, genre, director_id, image_url) 
                 VALUES (?, ?, ?, ?, ?, ?)`;

    db.run(sql, [title, description, release_year, genre, director_id, image_url], function (err) {
        callback(err, this ? this.lastID : null);
    });
};

// Function to update an existing movie
const updateMovie = (id, movieData, callback) => {
    const { title, description, release_year, genre, director_id, image_url } = movieData;
    const sql = `UPDATE Movies 
                 SET title = ?, description = ?, release_year = ?, genre = ?, director_id = ?, image_url = ? 
                 WHERE id = ?`;

    db.run(sql, [title, description, release_year, genre, director_id, image_url, id], function (err) {
        callback(err, this.changes);
    });
};

// Function to delete a movie
const deleteMovie = (id, callback) => {
    const sql = `DELETE FROM Movies WHERE id = ?`;

    db.run(sql, [id], function (err) {
        callback(err, this.changes);
    });
};

// Export the functions to be used in the controller
module.exports = {
    getAllMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie
};
