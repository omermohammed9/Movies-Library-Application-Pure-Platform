// Helper function to link actors to a movie
const db = require('../config/db');
const linkActorsToMovie = async (movieId, actorIds) => {
    console.log(`Linking actors: ${actorIds} to movie: ${movieId}`);
    if (!actorIds || actorIds.length === 0) {
        console.error('No actors to link.');
        return;  // Handle case where no actors are provided
    }
    if (actorIds && actorIds.length > 0) {
        const placeholders = actorIds.map(() => '(?, ?)').join(', ');
        const actorSql = `INSERT INTO Movie_Actors (movie_id, actor_id) VALUES ${placeholders}`;
        const actorParams = actorIds.reduce((acc, actorId) => acc.concat([movieId, actorId]), []);

        return new Promise((resolve, reject) => {
            db.run(actorSql, actorParams, (err) => {
                if (err) {
                    console.error("Error linking actors to movie:", err.message);
                    return reject(err);
                }
                console.log(`Actors linked to Movie ID ${movieId}: ${actorIds.join(', ')}`);
                resolve();
            });
        });
    } else {
        console.log("No valid actors to link to the movie.");
        return Promise.resolve();  // Nothing to link if no actor IDs are available
    }
};

module.exports = {linkActorsToMovie}


// const db = require('../config/db');
//
// const findOrCreateActors = async (actorNames) => {
//     return Promise.all(actorNames.map(name =>
//         new Promise((resolve, reject) => {
//             db.get(`SELECT actor_id FROM Actors WHERE name = ?`, [name], (err, row) => {
//                 if (err) {
//                     return reject(err);
//                 }
//                 if (row) {
//                     resolve(row.actor_id);
//                 } else {
//                     db.run(`INSERT INTO Actors (name) VALUES (?)`, [name], function(err) {
//                         if (err) {
//                             return reject(err);
//                         }
//                         resolve(this.lastID);
//                     });
//                 }
//             });
//         })
//     ));
// };
//
// const linkActorsToMovie = async (movieId, actorNames) => {
//     console.log(`Processing actors: ${actorNames} for movie: ${movieId}`);
//     if (!actorNames || actorNames.length === 0) {
//         console.error('No actors provided.');
//         return;  // Handle case where no actors are provided
//     }
//
//     try {
//         const actorIds = await findOrCreateActors(actorNames);
//         const placeholders = actorIds.map(() => '(?, ?)').join(', ');
//         const actorSql = `INSERT OR IGNORE INTO Movie_Actors (movie_id, actor_id) VALUES ${placeholders}`;
//         const actorParams = actorIds.reduce((acc, actorId) => acc.concat([movieId, actorId]), []);
//
//         return new Promise((resolve, reject) => {
//             db.run(actorSql, actorParams, (err) => {
//                 if (err) {
//                     console.error("Error linking actors to movie:", err.message);
//                     return reject(err);
//                 }
//                 console.log(`Actors linked to Movie ID ${movieId}: ${actorNames.join(', ')}`);
//                 resolve();
//             });
//         });
//     } catch (error) {
//         console.error('Failed to process actors:', error);
//         throw error;
//     }
// };
//
// module.exports = { linkActorsToMovie };
