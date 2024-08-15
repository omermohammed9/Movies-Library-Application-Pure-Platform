const db = require('../config/db');

const getAllDirectors = (callback) => {
    const sql = 'SELECT * FROM Directors';
    db.all(sql, [], (err, rows) => {
        callback(err, rows);
    });
};
const getDirectorById = (id, callback) => {
    const sql = 'SELECT * FROM Directors WHERE id = ?';
    db.get(sql, [id], (err, row) => {
        callback(err, row);
    });
};

const createDirector = (directorData, callback) => {
    const { name, age, country_of_origin } = directorData;

    // SQL query to check if the director already exists
    const checkSql = 'SELECT * FROM Directors WHERE name = ? AND age = ? AND country_of_origin = ?';

    // First, check if the director already exists
    db.get(checkSql, [name, age, country_of_origin], (err, row) => {
        if (err) {
            return callback(err);
        }

        if (row) {
            // If the director exists, return an error message or handle as needed
            return callback(new Error('Director with the same data already exists'), null);
        } else {
            // If the director does not exist, proceed with the insertion
            const insertSql = 'INSERT INTO Directors (name, age, country_of_origin) VALUES (?, ?, ?)';
            db.run(insertSql, [name, age, country_of_origin], function (err) {
                if (err) {
                    return callback(err);
                }
                callback(null, this.lastID); // Return the last inserted ID
            });
        }
    });
};


const updateDirector = (id, directorData, callback) => {
    const { name, age, country_of_origin } = directorData;
    const sql = 'UPDATE Directors SET name = ?, age = ?, country_of_origin = ? WHERE id = ?';
    db.run(sql, [name, age, country_of_origin, id], function (err) {
        callback(err, this.changes);
    });
};

const deleteDirector = (id, callback) => {
    const sql = 'DELETE FROM Directors WHERE id = ?';
    db.run(sql, [id], function (err) {
        callback(err, this.changes);
    });
};

module.exports = {
    getAllDirectors,
    getDirectorById,
    createDirector,
    updateDirector,
    deleteDirector
}