// Helper function to get or create a director
// import {getDirectorByName} from "../models/directorModel";
const {getDirectorByName} = require("../models/directorModel");
const getOrCreateDirector = async (director_name) => {
    let director = await getDirectorByName(director_name);

    if (!director) {
        console.log(`Inserting new director: ${director_name}`);
        return new Promise((resolve, reject) => {
            db.run(`INSERT INTO Directors (name) VALUES (?)`, [director_name], function (err) {
                if (err) {
                    console.error("Error inserting director:", err.message);
                    return reject(err);
                }
                resolve({ id: this.lastID });
            });
        });
    }
    return director;
};

module.exports =getOrCreateDirector
