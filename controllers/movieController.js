const movieModel = require('../models/movieModel');
const getYouTubeVideoID = require("../helpers/youTubeVideoID");

// Example usage in controller
exports.getAllMovies = (req, res) => {
    movieModel.getAllMovies((err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: "Success",
            data: rows
        });
    });
};

exports.createMovie = (req, res) => {
    console.log("Request body:", req.body);
    let url = req.body.youtube_url;
    console.log("YouTube URL:", url);
    let youtube_url = getYouTubeVideoID(req.body.youtube_url);
    console.log("Youtube URL after processing:",youtube_url);
    const { title, description, release_year, genre, director_name, image_url, actors } = req.body;
    console.log(' Director from request body Server:', req.body.director_name);
    console.log("Actors from request body Server:", req.body.actors);

    if (!actors || actors.length === 0) {
        throw new Error("No actors provided");  // Handle missing actors
    }


    // Validate actors array
    if (!Array.isArray(actors) || actors.length === 0) {
        return res.status(400).json({ error: "'actors' must be a non-empty array of actor names." });
    }

    movieModel.createMovie({ title, description, release_year, genre, director_name, image_url, actors, youtube_url }, (err, result) => {
        if (err) {
            res.status(500).json({ error: err });
            return;
        }
        res.json({
            message: "Movie and related entities created successfully",
            data: result
        });
    });
};


exports.getMovieById = (req, res) => {
    const id = req.params.id;
    movieModel.getMovieById(id, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: "Success",
            data: result
        });
    });
}

exports.updateMovie = (req, res) => {
    const id = req.params.id;

    // Check if the youtube_url is provided in the request
    let youtube_url = req.body.youtube_url ? getYouTubeVideoID(req.body.youtube_url) : null;

    if (!youtube_url) {
        // If the youtube_url from the request is null or undefined, retain the existing value from the database
        // Fetch existing movie data to get the current youtube_url
        movieModel.getMovieById(id, (err, movie) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to fetch movie details' });
            }
            youtube_url = movie.youtube_url; // Use the existing youtube_url
            updateMovieDetails(id, req.body, youtube_url, res); // Update the movie
        });
    } else {
        // Proceed to update the movie with the new youtube_url
        updateMovieDetails(id, req.body, youtube_url, res);
    }
};

const updateMovieDetails = (id, movieData, youtube_url, res) => {
    const { title, description, release_year, genre, image_url } = movieData;
    movieModel.updateMovie(id, { title, description, release_year, genre, image_url, youtube_url }, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Failed to update movie' });
        } else {
            res.json({ message: 'Movie updated successfully', data: result });
        }
    });
};

exports.deleteMovie = (req, res) => {
    const id = req.params.id;
    movieModel.deleteMovie(id, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: "Movie deleted successfully",
            data:  result + " rows deleted with id: " + id
        });
    });
}

// Controller function to handle adding actors to a movie
exports.addActorsToMovie = (req, res) => {
    const { movie_id, actors } = req.body;

    // Check if 'movie_id' is a number
    if (typeof movie_id !== 'number') {
        return res.status(400).json({ error: "'movie_id' must be a number." });
    }
    // Check if 'actors' is a number (single actor) or an array
    let actorIds = [];
    if (Array.isArray(actors)) {
        actorIds = actors;
    } else if (typeof actors === 'number') {
        actorIds = [actors];  // Wrap single actor ID in an array
    } else {
        return res.status(400).json({ error: "'actors' must be a number or an array of actor IDs." });
    }

    movieModel.addActorsToMovie(movie_id, actors, (err, result) => {
        if (err) {
            res.status(500).json({ error: err });
        } else {
            res.json({ message: result });
        }
    });
};

// Controller function to get a movie with its actors
exports.getMovieWithActors = (req, res) => {
    const { id } = req.params;

    movieModel.getMovieWithActors(id, (err, movie) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        // Return full movie details including actors
        return res.status(200).json({ message: "Success", movie });
    });
};
