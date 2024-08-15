const actorModel = require('../models/actorModel');

exports.getAllActors = (req, res) => {
    actorModel.getAllActors((err, rows) => {
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

exports.getActorById = (req, res) => {
    const id = req.params.id;
    actorModel.getActorById(id, (err, result) => {
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
exports.createActor = (req, res) => {
    const { name, age, country_of_origin } = req.body;
    actorModel.createActor({ name, age, country_of_origin }, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: "Actor created successfully",
            data: result
        });
    });
};

exports.updateActor = (req, res) => {
    const id = req.params.id;
    const { name, age, country_of_origin } = req.body;
    actorModel.updateActor(id, { name, age, country_of_origin }, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: "Actor updated successfully",
            data: result
        });
    });
};

exports.deleteActor = (req, res) => {
    const id = req.params.id;
    actorModel.deleteActor(id, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: "Actor deleted successfully",
            data: result
        });
    });
};
