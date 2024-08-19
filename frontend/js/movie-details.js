$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');

    console.log("Movie ID from URL:", movieId); // Log the movie ID from URL

    if (movieId) {
        console.log("Fetching details for Movie ID:", movieId);
        fetchMovieDetails(movieId);
    } else {
        console.error("Movie ID not found in URL.");
        Swal.fire({
            title: 'Error!',
            text: 'Movie ID not found!',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }


    function fetchMovieDetails(movieId) {
        console.log("Fetching details for Movie ID:", movieId);
        fetch(`http://localhost:1010/movies/${movieId}`)
            .then(response => {
                if (!response.ok) {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Failed to fetch movie details!',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                    throw new Error('Error fetching movie details');
                }
                return response.json();
        })
            .then(data => {
                console.log("API Response:", data); // Log the entire API response
                if (!data) {
                    console.error("No data received from API.");
                    return;
                }

                const movie = data.data;  // Access `data.data` directly
                console.log("Movie details:", movie);

                // Director information (as `director_name`)
                const director_name = movie.director_name;
                console.log("Director:", director_name);

                // Populate the HTML elements with movie details
                $('#movie-title').text(movie.title);
                $('#movie-image').attr('src', movie.image_url);
                $('#movie-release-year').text(movie.release_year);
                $('#movie-genre').text(movie.genre);
                $('#movie-description').text(movie.description);
                $('#movie-director').text(director_name);  // Use the director name from the response

                // Populate actors (if they exist)
                const actorList = $('#movie-actors');
                if (movie.actors && movie.actors.length > 0) {
                    movie.actors.forEach(actor => {
                        actorList.append(`<li>${actor.name} (Age: ${actor.age || 'N/A'}, Country: ${actor.country_of_origin || 'Unknown'})</li>`);
                    });
                } else {
                    actorList.append('<li>No actors available</li>');
                }
                Swal.fire({
                    title: 'Success!',
                    text: 'Movie details loaded successfully!',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                });
            })
            .catch(error => {
                console.error('Error fetching movie details:', error);
                Swal.fire({
                    title: 'Error!',
                    text: 'Could not load movie details.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
    }
});
