$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('movieId');

    if (movieId) {
        fetchMovieDetails(movieId);
    }

    function fetchMovieDetails(id) {
        fetch(`http://localhost:1010/${id}/actors`)
            .then(response => response.json())
            .then(data => {

                const movie = data.movie;
                console.log(movie)
                const director = data.directors;
                console.log(director)
                const actors = data.actors;

                // Populate the HTML elements with movie details
                $('#movie-title').text(movie.title);
                $('#movie-image').attr('src', movie.image_url);
                $('#movie-release-year').text(movie.release_year);
                $('#movie-genre').text(movie.genre);
                $('#movie-description').text(movie.description);
                $('#movie-director').text(`${director.name} (Age: ${director.age}, Country: ${director.country_of_origin})`);

                const actorList = $('#movie-actors');
                actors.forEach(actor => {
                    actorList.append(`<li>${actor.name} (Age: ${actor.age}, Country: ${actor.country_of_origin})</li>`);
                });
            })
            .catch(error => {
                console.error('Error fetching movie details:', error);
            });
    }
});
