import {collectActorsData, collectDirectorData, collectMovieData} from "./utility.js";
import {addMovie, createActor, createDirector} from "./api.js";

async function submitForm() {
    try {
        console.log(this);
        const formData = new FormData(this);
        const movieData = collectMovieData(formData);
        const directorData = collectDirectorData(formData);
        console.log(directorData);
        const actorsData = collectActorsData(formData);
        console.log(actorsData);

        // Create director and get their ID
        const director = await createDirector(directorData);
        movieData.director_id = director.id;

        // Create actors in parallel and get their IDs
        if (!actorsData || actorsData.length === 0) {
            console.warn("No actors to create.");
            movieData.actors = [];
        } else {
            const actorResponses = await Promise.all(actorsData.map(actor => createActor(actor)));
            movieData.actors = actorResponses.map(actor => actor.id);
        }



        // const actorResponses = await Promise.all(actorsData.map(actor => createActor(actor)));
        // movieData.actors = actorResponses.map(actor => actor.id);

        // Finally, add the movie
        await addMovie(movieData);

        // Optionally, show a success message or redirect
        alert('Movie added successfully!');

    } catch (error) {
        // This will catch any errors that occur during the process
        console.error('An error occurred:', error);
        alert('An error occurred while submitting the form. Please try again.');
    }
}
export {submitForm}