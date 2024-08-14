const directorModel = require('../models/directorModel');

exports.getAllDirectors = (req, res) => {
    directorModel.getAllDirectors((err, rows) => {
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

exports.createDirector = (req, res) => {
    const { name, age, country_of_origin } = req.body;
    directorModel.createDirector({ name, age, country_of_origin }, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: "Director created successfully",
            data: result
        });
    });
};

exports.getDirectorById = (req, res) => {
    const id = req.params.id;
    directorModel.getDirectorById(id, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: "Success",
            data: result
        });
    });
};

exports.updateDirector = (req, res) => {
    const id = req.params.id;
    const { name, age, country_of_origin } = req.body;
    directorModel.updateDirector(id, { name, age, country_of_origin }, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: "Director updated successfully",
            data: result
        });
    });
};

exports.deleteDirector = (req, res) => {
    const id = req.params.id;
    directorModel.deleteDirector(id, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: "Director deleted successfully",
            data: result
        });
    });
};
