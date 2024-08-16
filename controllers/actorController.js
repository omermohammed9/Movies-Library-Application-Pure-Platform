const actorModel = require('../models/actorModel');

exports.getAllActors = (req, res) => {
    actorModel.getAllActors((err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(200).json({ message: "Success", data: rows });
    });
};

exports.getActorById = (req, res) => {
    const id = req.params.id;
    actorModel.getActorById(id, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(200).json({ message: "Success", data: result });
    });
};
exports.createActor = (req, res) => {
    const { name, age, country_of_origin } = req.body;
    actorModel.createActor({ name, age, country_of_origin }, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        //res.json(200).json({ message: "Actor created successfully", result });
        return res.status(200).json({ message: "Actor created successfully", result });
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
        res.json(200).json({ message: "Actor updated successfully", result });
    });
};

exports.deleteActor = (req, res) => {
    const id = req.params.id;
    actorModel.deleteActor(id, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(200).json({ message: "Actor deleted successfully", result });
    });
};
