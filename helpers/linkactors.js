// Helper function to link actors to a movie
const db = require('../config/db');
const linkActorsToMovie = async (movieId, actorIds) => {
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
