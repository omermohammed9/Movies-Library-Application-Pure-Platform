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

const createActor = (actorData, callback) => {
    const { name, age, country_of_origin } = actorData;

    // SQL query to check if the actor already exists
    const checkSql = 'SELECT * FROM actors WHERE name = ? AND age = ? AND country_of_origin = ?';

    // First, check if the actor already exists
    db.get(checkSql, [name, age, country_of_origin], (err, row) => {
        if (err) {
            return callback(err);
        }

        if (row) {
            // If the actor exists, return an error message or handle as needed
            return callback(new Error('Actor with the same data already exists'), null);
        } else {
            // If the actor does not exist, proceed with the insertion
            const insertSql = 'INSERT INTO actors (name, age, country_of_origin) VALUES (?, ?, ?)';
            db.run(insertSql, [name, age, country_of_origin], function (err) {
                if (err) {
                    return callback(err);
                }
                callback(null, this.lastID); // Return the last inserted ID
            });
        }
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
    createActor,
    updateActor,
    deleteActor
}