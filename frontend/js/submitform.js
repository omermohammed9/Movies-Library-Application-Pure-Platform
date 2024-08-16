import {collectActorsData, collectDirectorData, collectMovieData} from "./utility";
import {addMovie, createActor, createDirector} from "./api";

async function submitForm() {
    try {
        const formData = new FormData(this);
        const movieData = collectMovieData(formData);
        const directorData = collectDirectorData(formData);
        const actorsData = collectActorsData(formData);

        // Create director and get their ID
        const director = await createDirector(directorData);
        movieData.director_id = director.id;

        // Create actors in parallel and get their IDs
        const actorResponses = await Promise.all(actorsData.map(actor => createActor(actor)));
        movieData.actors = actorResponses.map(actor => actor.id);

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