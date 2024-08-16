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
    const sql = 'INSERT INTO Directors (name, age, country_of_origin) VALUES (?, ?, ?)';
    db.run(sql, [name, age, country_of_origin], function (err) {
        callback(err, this.lastID);
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