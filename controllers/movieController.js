const movieModel = require('../models/movieModel');

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
    const { title, description, release_year, genre, director_id, image_url } = req.body;
    movieModel.createMovie({ title, description, release_year, genre, director_id, image_url }, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: "Movie created successfully",
            data: result
        });
    });
}

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
    const { title, description, release_year, genre, director_id, image_url } = req.body;
    movieModel.updateMovie(id, { title, description, release_year, genre, director_id, image_url }, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: "Movie updated successfully",
            data: result
        });
    });
}

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