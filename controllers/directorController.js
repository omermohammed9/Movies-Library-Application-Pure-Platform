const directorModel = require('../models/directorModel');

exports.getAllDirectors = (req, res) => {
    console.log('Received request for all directors');  // Log request receipt
    directorModel.getAllDirectors((err, rows) => {
        if (err) {
            console.error('Error querying directors:', err.message);  // Log errors
            return res.status(500).json({ error: err.message });
        }

        if (rows.length === 0) {
            console.log('No directors found');  // Log empty result
            return res.status(404).json({ message: "No directors found" });
        }

        console.log('Successfully retrieved directors');  // Log success
        return res.status(200).json({ message: "Success", data: rows });
    });
};

exports.createDirector = (req, res) => {
    const { name, age, country_of_origin } = req.body;
    directorModel.createDirector({ name, age, country_of_origin }, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        //res.json(200).json({ message: "Director created successfully", result });

        return res.status(200).json({ message: "Director created successfully", result });r});
};

exports.getDirectorById = (req, res) => {
    const id = req.params.id;
    directorModel.getDirectorById(id, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(200).json({ message: "Success", data: result });
    });
};

exports.getDirectorByName = (req, res) => {
    const name = req.params.name;

    // Call the model function to get the director by name
    directorModel.getDirectorByName(name, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // Handle the case where the director is not found
        if (!result) {
            return res.status(404).json({ message: `Director ${name} not found` });
        }

        // If found, return the director details
        return res.status(200).json({ message: "Success, director found", data: result });
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
        res.status(200).json({ message: "Director updated successfully", result });
    });
};

exports.deleteDirector = (req, res) => {
    const id = req.params.id;
    directorModel.deleteDirector(id, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Director not found" });
        }
        res.status(200).json({ message: "Director deleted successfully", result });
    });
};
