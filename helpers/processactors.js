// Helper function to process actors (insert new actors and get their IDs)
// import {getActorsByName} from "../models/actorModel";
const {getActorsByName} = require("../models/actorModel");
const {insertActor} = require("../helpers/insertactor.js");

const processActors = async (actors) => {
    const existingActors = await getActorsByName(actors);
    console.log("Existing actors from DB:", existingActors);

    const existingActorIds = existingActors.map(actor => actor.id);
    const newActors = actors.filter(actor_name => !existingActors.some(existingActor => existingActor.name === actor_name));
    console.log("New Actors:", newActors);

    for (let actor_name of newActors) {
        if (!actor_name || actor_name.trim() === "") {
            console.error("Skipping empty actor name.");
            continue;  // Skip empty or invalid actor names
        }
        console.log(`Inserting Actor: ${actor_name}`);
        const newActorId = await insertActor(actor_name);
        existingActorIds.push(newActorId);  // Add the new actor ID to the list
    }
    return existingActorIds;
};

module.exports = processActors;
