//const db = require('../config/db');

const db = require('../config/db');
const { getDirectorByName} = require("../models/directorModel");


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

    console.log("Director Name:", director_name);

    // Validate director_name
    if (!director_name || director_name.trim() === "") {
        throw new Error("Director name cannot be empty");
    }


    try {
        // Check if the director exists in the database
        let director = await getDirectorByName(director_name);

        // Log the director name

        if (!director) {
            // If the director doesn't exist, insert it
            await new Promise((resolve, reject) => {
                db.run(`INSERT INTO Directors (name) VALUES (?)`, [director_name], function (err) {
                    if (err) return reject(err);
                    director = { id: this.lastID };  // Get the inserted director's ID
                    resolve();
                });
            });
        }

        // Log the director ID for debugging
        console.log("Director ID:", director.id);

        // Insert the movie with the director_id and get the movie ID
        await new Promise((resolve, reject) => {
            const sql = `INSERT INTO Movies (title, description, release_year, genre, director_id, image_url)
                         VALUES (?, ?, ?, ?, ?, ?)`;
            db.run(sql, [title, description, release_year, genre, director.id, image_url], function (err) {
                if (err) return reject(err);
                movieData.id = this.lastID;  // Get the last inserted movie ID
                resolve();
            });
        });

        // Log the movie ID for debugging
        console.log("Movie ID:", movieData.id);

        // Handle linking actors
        for (let actor_name of actors) {
            let actor = await db.get(`SELECT * FROM Actors WHERE name = ?`, [actor_name]);

            if (!actor) {
                await new Promise((resolve, reject) => {
                    db.run(`INSERT INTO Actors (name) VALUES (?)`, [actor_name], function (err) {
                        if (err) return reject(err);
                        actor = { id: this.lastID };  // Get the last inserted actor ID
                        resolve();
                    });
                });
            }

            // Link actor to the movie
            await new Promise((resolve, reject) => {
                db.run(`INSERT INTO Movie_Actors (movie_id, actor_id) VALUES (?, ?)`, [movieData.id, actor.id], function (err) {
                    if (err) return reject(err);
                    resolve();
                });
            });
        }

        // Callback to confirm successful creation
        callback(null, 'Movie and related entities created successfully');
    } catch (error) {
        console.error("Error creating movie:", error.message);
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
const addActorsToMovie = async (movie_id, actors, callback) => {
    const sql = `INSERT INTO Movie_Actors (movie_id, actor_id) VALUES (?, ?)`;
    let errors = [];

    try {
        await Promise.all(actors.map(actor_id => {
            return new Promise((resolve, reject) => {
                db.run(sql, [movie_id, actor_id], (err) => {
                    if (err) {
                        errors.push(err.message);
                        return reject(err);
                    }
                    resolve();
                });
            });
        }));

        if (errors.length > 0) {
            callback(errors.join(', '), null);
        } else {
            callback(null, 'Actors added successfully');
        }
    } catch (error) {
        callback(error.message, null);
    }
};


// Function to retrieve a movie with its associated actors
const getMovieWithActors = (movie_id, callback) => {
    const sqlMovie = `
        SELECT Movies.*, Directors.name as director_name
        FROM Movies
        LEFT JOIN Directors ON Movies.director_id = Directors.id
        WHERE Movies.id = ?;
    `;

    const sqlActors = `
        SELECT Actors.name, Actors.age, Actors.country_of_origin
        FROM Actors
        JOIN Movie_Actors ON Movie_Actors.actor_id = Actors.id
        WHERE Movie_Actors.movie_id = ?;
    `;

    db.get(sqlMovie, [movie_id], (err, movie) => {
        if (err) {
            return callback(err, null);
        }

        if (!movie) {
            return callback(new Error('Movie not found'), null);
        }

        db.all(sqlActors, [movie_id], (err, actors) => {
            if (err) {
                return callback(err, null);
            }

            movie.actors = actors;  // Attach actors to movie
            return callback(null, movie);  // Return full movie details
        });
    });
};

// const getMovieWithActors = (movie_id, callback) => {
//     const sql = `
//         SELECT Actors.name, Actors.age, Actors.country_of_origin
//         FROM Actors
//         JOIN Movie_Actors ON Movie_Actors.actor_id = Actors.id
//         WHERE Movie_Actors.movie_id = ?;
//     `;
//
//     db.all(sql, [movie_id], (err, actors) => {
//         if (err) {
//             return callback(err, null);
//         }
//
//         callback(null, actors);  // Return the list of actors
//     });
// };




// const getMovieWithActors = (movie_id, callback) => {
//     const sql = `
//          SELECT Movies.title, Actors.name
//         FROM Movies
//         JOIN Movie_Actors ON Movies.id = Movie_Actors.movie_id
//         JOIN Actors ON Movie_Actors.actor_id = Actors.id
//         WHERE Movies.id = ?
//     `;
//
//     db.all(sql, [movie_id], (err, rows) => {
//         if (err) {
//             callback(err, null);
//         } else {
//             callback(null, rows);
//         }
//     });
// };


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
