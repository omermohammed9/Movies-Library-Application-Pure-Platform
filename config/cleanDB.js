const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

// Clean the Movies and Actors tables
db.run('DELETE FROM Movies', function(err) {
    if (err) {
        return console.error(err.message);
    }
    console.log(`Movies table cleared.`);
});

db.run('DELETE FROM Actors', function(err) {
    if (err) {
        return console.error(err.message);
    }
    console.log(`Actors table cleared.`);
});

db.run('DELETE FROM Movie_Actors', function(err) {
    if (err) {
        return console.error(err.message);
    }
    console.log(`Movie_Actors table cleared.`);
});

db.run ('DELETE FROM Directors', function(err) {
    if (err) {
        return console.error(err.message);
    }
    console.log(`Movie_Directors table cleared.`);
});

db.run ('DELETE FROM Likes', function(err) {
    if (err) {
        return console.error(err.message);
    }
    console.log(`Likes table cleared.`);
});

db.run('DELETE FROM Comments', function(err) {
    if (err) {
        return console.error(err.message);
    }
    console.log(`Comments table cleared.`);
});

db.run('VACUUM', function(err) {
    if (err) {
        return console.error(err.message);
    }
    console.log(`Database vacuumed.`);
});


// Close the database connection
db.close((err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Closed the database connection.');
});
