//const db = require('../config/db');

const db = require('../config/db');


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
const createMovie = async (movieData, callback) => {
    const { title, description, release_year, genre, director_name, image_url, actors } = movieData;

    try {
        // Find or create director
        let director = await db.get(`SELECT * FROM Directors WHERE name = ?`, [director_name]);
        if (!director) {
            await db.run(`INSERT INTO Directors (name) VALUES (?)`, [director_name]);
            director = await db.get(`SELECT * FROM Directors WHERE name = ?`, [director_name]);
        }

        // Insert movie with director_id
        const sql = `INSERT INTO Movies (title, description, release_year, genre, director_id, image_url) 
                     VALUES (?, ?, ?, ?, ?, ?)`;
        await db.run(sql, [title, description, release_year, genre, director.id, image_url]);

        // Get the inserted movie ID
        const movie = await db.get(`SELECT * FROM Movies WHERE title = ?`, [title]);

        // Find or create actors and link them to the movie
        let errors = [];
        for (let actor_name of actors) {
            let actor = await db.get(`SELECT * FROM Actors WHERE name = ?`, [actor_name]);
            if (!actor) {
                await db.run(`INSERT INTO Actors (name) VALUES (?)`, [actor_name]);
                actor = await db.get(`SELECT * FROM Actors WHERE name = ?`, [actor_name]);
            }
            // Link actor to the movie
            await db.run(`INSERT INTO Movie_Actors (movie_id, actor_id) VALUES (?, ?)`, [movie.id, actor.id]);
        }

        callback(null, 'Movie and related entities created successfully');
    } catch (error) {
        callback(error.message, null);
    }
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

// Function to add actors to a movie
const addActorsToMovie = (movie_id, actors, callback) => {
    const sql = `INSERT INTO Movie_Actors (movie_id, actor_id) VALUES (?, ?)`;
    let errors = [];

    actors.forEach(actor_id => {
        db.run(sql, [movie_id, actor_id], (err) => {
            if (err) {
                errors.push(err.message);
            }
        });
    });

    if (errors.length > 0) {
        callback(errors.join(', '), null);
    } else {
        callback(null, 'Actors added successfully');
    }
};

// Function to retrieve a movie with its associated actors
const getMovieWithActors = (movie_id, callback) => {
    const sql = `
        SELECT Movies.title, Actors.name
        FROM Movies
        JOIN Movie_Actors ON Movies.id = Movie_Actors.movie_id
        JOIN Actors ON Movie_Actors.actor_id = Actors.id
        WHERE Movies.id = ?
    `;

    db.all(sql, [movie_id], (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        }
    });
};


// Export the functions to be used in the controller
module.exports = {
    getAllMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie,
    addActorsToMovie,
    getMovieWithActors
};
