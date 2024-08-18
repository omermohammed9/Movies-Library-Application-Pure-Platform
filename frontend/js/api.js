const API_BASE_URL = 'http://localhost:1010'; // Base URL for the API

// Function to fetch all movies
const fetchMovies = () => {
    return fetch(`${API_BASE_URL}/movies`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error fetching movies');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error:', error);
        });
};

// Function to fetch a movie's details along with its actors
const fetchMovieWithActors = (movieId) => {
    return fetch(`${API_BASE_URL}/movies/${movieId}/actors`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error fetching movie details');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error:', error);
        });
};

// Function to add a new movie
const addMovie = (movieData) => {
    console.log(movieData);
    return fetch(`${API_BASE_URL}/movies/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movieData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error adding movie');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error:', error);
        });
};

const deleteMovie = (movieId) => {
    return fetch(`${API_BASE_URL}/movies/${movieId}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error deleting movie');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error:', error);
        });
};

const editMovie = (movieId, movieData) => {
    return fetch(`${API_BASE_URL}/movies/${movieId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movieData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error editing movie');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


const createDirector = (directorData) => {
    return fetch(`${API_BASE_URL}/directors/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(directorData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error creating director');
            }
            return response.json();
        });
};

// Function to create an actor
const createActor = (actorData) => {
    console.log("Sending actor data:", actorData);  // Log actor data being sent
    return fetch(`${API_BASE_URL}/actors/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(actorData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error creating actor');
            }
            return response.json();
        })
        .then(result => {
            console.log("Actor created:", result);  // Log the created actor
            return result;
        })
        .catch(error => {
            console.error("Error in createActor:", error);
            throw error;  // Re-throw the error to be handled by the caller
        });
};



// Export the API functions so they can be used in other files
export { fetchMovies, fetchMovieWithActors, addMovie, deleteMovie, editMovie, createActor, createDirector };
