const db = require('../config/db');

const getAllActors = (callback) => {
    const sql = 'SELECT * FROM Actors';
    db.all(sql, [], (err, rows) => {
        callback(err, rows);
    });
};
const getActorById = (id, callback) => {
    const sql = 'SELECT * FROM Actors WHERE id = ?';
    db.get(sql, [id], (err, row) => {
        callback(err, row);
    });
};

// Function to get actors by names
const getActorsByName = (actorNames) => {
    return new Promise((resolve, reject) => {
        const placeholders = actorNames.map(() => '?').join(',');  // Create placeholders for SQL query
        const sql = `SELECT * FROM Actors WHERE name IN (${placeholders})`;

        db.all(sql, actorNames, (err, rows) => {
            if (err) return reject(err);
            resolve(rows);  // Return all actors found in the database
        });
    });
};

const createActor = (actorData, callback) => {
    const { name, age, country_of_origin } = actorData;
    const sql = 'INSERT INTO actors (name, age, country_of_origin) VALUES (?, ?, ?)';
    db.run(sql, [name, age, country_of_origin], function (err) {
        callback(err, this.lastID);
    });
};

const  updateActor = (id, actorData, callback) => {
    const { name, age, country_of_origin } = actorData;
    const sql = 'UPDATE actors SET name = ?, age = ?, country_of_origin = ? WHERE id = ?';
    db.run(sql, [name, age, country_of_origin, id], function (err) {
        callback(err, this.changes);
    });
};

const deleteActor = (id, callback) => {
    const sql = 'DELETE FROM actors WHERE id = ?';
    db.run(sql, [id], function (err) {
        callback(err, this.changes);
    });
};

module.exports = {
    getAllActors,
    getActorById,
    getActorsByName,
    createActor,
    updateActor,
    deleteActor
}