import { fetchMovies, fetchMovieWithActors, deleteMovie, editMovie } from './api.js';
import {createMovieCard} from "./movieCard.js";
import {submitForm} from "./submitform.js";


$(document).ready(function () {
    const $moviesList = $('#movies-container');
    const $addMovieModal = new bootstrap.Modal(document.getElementById('add-movie-modal'));
    const $editMovieModal = new bootstrap.Modal(document.getElementById('edit-movie-modal'));
    const $addMovieForm = $('#add-movie-form');
    const $editMovieForm = $('#edit-movie-form');

    // Fetch and display movies as Bootstrap cards
    const loadMovies = () => {
        $moviesList.empty(); // Clear existing movies
        fetchMovies()
            .then(response => {
                const movies = response.data;
                if (!movies || movies.length === 0) {
                    $moviesList.html('<p>No movies available. Add one!</p>');
                } else {
                    movies.forEach(movie => {
                        const movieCard = createMovieCard(movie);
                        $moviesList.append(movieCard);
                    });

                    // Add event listeners for delete and edit buttons
                    $('.delete-button').on('click', function () {
                        const movieId = $(this).data('id');
                        confirmDelete(movieId);
                    });

                    $('.edit-button').on('click', function () {
                        const movieId = $(this).data('id');
                        loadMovieDetailsForEdit(movieId);
                    });
                    $('.movie-card').on('click', function () {
                        const movieId = $(this).data('id');
                        window.location.href = `./frontend/movie-details.html?id=${movieId}`;
                        //loadMovieDetails(movieId);
                    })
                }
            })
            .catch(error => {
                $moviesList.html('<p>Error loading movies. Please try again later.</p>');
            });
    };

    // Handle movie form submission (adding a new movie)
    $addMovieForm.on('submit', function (e) {
        e.preventDefault();
        submitForm(this)
            .then(() => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Movie added successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                $addMovieModal.hide();  // Close modal
                loadMovies();  // Reload the movies
            })
            .catch(() => {
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to add movie.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
    });


    // Handle edit movie form submission (updating movie details)
    $editMovieForm.on('submit', function (e) {
        e.preventDefault();
        const movieId = $('#edit-movie-id').val();
        const formData = new FormData(this);
        const updatedMovieData = {
            title: formData.get('title'),
            description: formData.get('description'),
            release_year: formData.get('release_year'),
            genre: formData.get('genre'),
            director_id: formData.get('director_id'),
            image_url: formData.get('image_url'),
            actors: formData.get('actors').split(',').map(Number)
        };

        editMovie(movieId, updatedMovieData)
            .then(() => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Movie updated successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                $editMovieModal.hide();  // Close modal
                loadMovies();  // Reload the movies
            })
            .catch(() => {
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to update movie.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
    });

    // Load movie details for editing
    const loadMovieDetailsForEdit = (movieId) => {
        fetchMovieWithActors(movieId)
            .then(response => {
                const movie = response;  // Assuming the movie data is in the first index
                $('#edit-title').val(movie.title);
                $('#edit-description').val(movie.description);
                $('#edit-release_year').val(movie.release_year);
                $('#edit-genre').val(movie.genre);
                $('#edit-director_id').val(movie.director_id);
                $('#edit-image_url').val(movie.image_url);
                $('#edit-actors').val(movie.actors.join(','));  // Assuming actors is an array
                $('#edit-movie-id').val(movieId);  // Set hidden movie ID for update
                $editMovieModal.show();  // Show the edit modal
            })
            .catch(error => {
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to load movie details.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
    };

    // Confirm deletion of a movie
    const confirmDelete = (movieId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMovie(movieId) // Call API to delete movie
                    .then(() => {
                        Swal.fire(
                            'Deleted!',
                            'Movie has been deleted.',
                            'success'
                        );
                        loadMovies();  // Reload movies
                    })
                    .catch(() => {
                        Swal.fire(
                            'Error!',
                            'Movie could not be deleted.',
                            'error'
                        );
                    });
            }
        });
    };

    // Load all movies on page load
    loadMovies();
});


