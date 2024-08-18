// Helper function to insert a new actor
const insertActor = async (actor_name) => {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO Actors (name) VALUES (?)`, [actor_name], function (err) {
            if (err) {
                console.error("Error inserting actor:", err.message);
                return reject(err);
            }
            console.log(`Inserted Actor: ${actor_name} with ID ${this.lastID}`);
            resolve(this.lastID);  // Return the inserted actor ID
        });
    });
};

module.exports = insertActor
