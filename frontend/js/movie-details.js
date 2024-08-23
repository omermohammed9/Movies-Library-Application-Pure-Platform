import {fetchMovieWithActors} from "./api.js";

$(document).ready(function () {
    const movieId = getMovieIdFromURL();

    if (isOnMovieDetailsPage()) {
        initMovieDetails(movieId);
    }

    // Initialize movie details if on the correct page
    function initMovieDetails(movieId) {
        if (!movieId) {
            showAlert("No movie selected. Please go back and choose a movie.");
            return;
        }

        fetchMovieDetails(movieId);
        fetchLikeCount(movieId);
        fetchComments(movieId);
        handleLikeButton(movieId);
        handleCommentSubmit(movieId);
    }

    // Get movie ID from URL
    function getMovieIdFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
    }

    // Check if the current page is the movie-details page
    function isOnMovieDetailsPage() {
        return window.location.pathname.includes('movie-details.html');
    }

    // Display alert message
    function showAlert(message) {
        alert(message);
    }

    // Fetch and display movie details
    function fetchMovieDetails(movieId) {
        fetch(`http://localhost:1010/movies/${movieId}`)
            .then(handleResponse)
            .then(displayMovieDetails)
            .catch(showError('Could not load movie details.'));
    }

    // Display movie details in the DOM
    function displayMovieDetails(data) {
        const movie = data.data;
        if (!movie) return showAlert("No movie data found.");

        $('#movie-title').text(movie.title);
        $('#movie-image').attr('src', movie.image_url);
        $('#movie-release-year').text(movie.release_year);
        $('#movie-genre').text(movie.genre);
        $('#movie-description').text(movie.description);
        $('#movie-director').text(movie.director_name || 'Unknown');

        displayActors(movie.actors);
    }

    // Display actors in the DOM
    async function displayActors(movieId) {
        movieId = movieId || getMovieIdFromURL();
        try {
            // Assuming you have a function `getActorsByMovieId` to fetch actors based on movieId
            const movieData  = await fetchMovieWithActors(movieId);
            const actorList = $('#movie-actors'); // Assuming #movie-actors is the element where you want to display actors
            actorList.empty();

            // Access the actors from the nested movie data
            const actors = movieData.movie.actors;

            if (actors && actors.length > 0) {
                actors.forEach(actor => {
                    actorList.append(`<li>${actor.name} (Age: ${actor.age || 'N/A'}, Country: ${actor.country_of_origin || 'Unknown'})</li>`);
                });
            } else {
                actorList.append('<li>No actors available</li>');
            }
        } catch (error) {
            console.error('Error fetching actors:', error);
            $('#movie-actors').html('<li>Error fetching actors.</li>');
        }
    }
    // Fetch and display like count
    function fetchLikeCount(movieId) {
        fetch(`http://localhost:1010/likes/movies/${movieId}/likes`)
            .then(handleResponse)
            .then(data => $('#like-count').text(data.likeCount || 0))
            .catch(showError('Error fetching like count.'));
    }

    // Add like functionality
    function handleLikeButton(movieId) {
        $('#like-button').on('click', function () {
            fetch(`http://localhost:1010/likes/movies/${movieId}/like`, { method: 'POST' })
                .then(handleResponse)
                .then(data => $('#like-count').text(data.likeCount))
                .catch(showError('Failed to add like.'));
        });
    }

    // Fetch and display comments
    function fetchComments(movieId) {
        fetch(`http://localhost:1010/comments/movies/${movieId}/comments`)
            .then(handleResponse)
            .then(displayComments)
            .catch(showError('Error fetching comments.'));
    }

    // Display comments in the DOM
    function displayComments(comments) {
        const commentsList = $('#comments-list');
        commentsList.empty();
        comments.forEach(comment => {
            commentsList.append(`<div class="comment-item"><p>${comment.comment}</p><small class="text">at ${new Date(comment.created_at).toLocaleString()}</small></div>`);
        });
    }

    // Handle comment submission
    function handleCommentSubmit(movieId) {
        $('#add-comment-btn').on('click', function () {
            const comment = $('#comment-text').val().trim();
            if (!comment) return showAlert('Please enter a comment.');
            addComment(movieId, comment);
        });
    }

    // Add a comment
    function addComment(movieId, comment) {
        fetch(`http://localhost:1010/comments/movies/${movieId}/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ comment }),
        })
            .then(handleResponse)
            .then(() => {
                $('#comment-text').val('');
                fetchComments(movieId);
            })
            .catch(showError('Error adding comment.'));
    }

    // Handle response and errors
    function handleResponse(response) {
        if (!response.ok) throw new Error('Failed to fetch data');
        return response.json();
    }

    function showError(message) {
        return function (error) {
            console.error(`${message}:`, error);
        };
    }
});
