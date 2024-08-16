import { fetchMovies, fetchMovieWithActors, addMovie, deleteMovie, editMovie, createActor, createDirector } from './api.js';
import {collectActorsData, collectDirectorData, collectMovieData} from "./utility.js";
import {createMovieCard} from "./movieCard.js";
import {submitForm} from "./submitform";
// import {updateMovie} from "../../models/movieModel";
//import {deleteMovie} from "../../models/movieModel";

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



// $(document).ready(function () {
//     const $moviesList = $('#movies-container');
//     const $movieDetails = $('#movie-details');
//     const $movieInfo = $('#movie-info');
//     const $actorsList = $('#actors-list');
//     const $addMovieBtn = $('#add-movie-btn');
//     const $addMovieModal = $('#add-movie-modal');
//     const $addMovieForm = $('#add-movie-form');
//     const $closeModalBtn = $('#close-modal-btn');
//     const $backBtn = $('#back-btn');
//     const $noMoviesMessage = $('#no-movies-message');
//     const $loadingMessage = $('#loading');
//
//     // Fetch and display movies
//     $(document).ready(function () {
//         const $moviesList = $('#movies-container');
//         const $addMovieModal = new bootstrap.Modal(document.getElementById('add-movie-modal'));
//         const $addMovieForm = $('#add-movie-form');
//
//         // Fetch and display movies as Bootstrap cards
//         const loadMovies = () => {
//             $moviesList.empty(); // Clear existing movies
//             fetchMovies()
//                 .then(response => {
//                     const movies = response.data;
//
//                     if (!movies || movies.length === 0) {
//                         $moviesList.html('<p>No movies available. Add one!</p>');
//                     } else {
//                         movies.forEach(movie => {
//                             const movieCard = `
//                             <div class="col-md-4">
//                                 <div class="movie-card position-relative">
//                                     <img src="${movie.image_url}" alt="${movie.title}">
//                                     <div class="card-body">
//                                         <h5 class="card-title">${movie.title}</h5>
//                                         <div class="movie-stats">
//                                             <div>
//                                                 <span>01:37</span>
//                                                 <small>Length</small>
//                                             </div>
//                                             <div>
//                                                 <span>Eng</span>
//                                                 <small>Lang</small>
//                                             </div>
//                                             <div>
//                                                 <span>6.4</span>
//                                                 <small>Rating</small>
//                                             </div>
//                                             <div>
//                                                 <span>45+</span>
//                                                 <small>Review</small>
//                                             </div>
//                                         </div>
//                                         <div class="play-button">
//                                             <i class="fas fa-play"></i>
//                                         </div>
//                                         <div class="delete-button" data-id="${movie.id}">
//                                             <i class="fas fa-trash"></i>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         `;
//                             $moviesList.append(movieCard);
//                         });
//
//                         // Add event listener for delete buttons
//                         $('.delete-button').on('click', function () {
//                             const movieId = $(this).data('id');
//                             confirmDelete(movieId);
//                         });
//                     }
//                 })
//                 .catch(error => {
//                     $moviesList.html('<p>Error loading movies. Please try again later.</p>');
//                 });
//         };
//
//         // Handle movie form submission
//         $addMovieForm.on('submit', function (e) {
//             e.preventDefault();
//             const formData = new FormData(this);
//             const movieData = {
//                 title: formData.get('title'),
//                 description: formData.get('description'),
//                 release_year: formData.get('release_year'),
//                 genre: formData.get('genre'),
//                 director_id: formData.get('director_id'),
//                 image_url: formData.get('image_url'),
//                 actors: formData.get('actors').split(',').map(Number)
//             };
//
//             addMovie(movieData)
//                 .then(() => {
//                     Swal.fire({
//                         title: 'Success!',
//                         text: 'Movie added successfully.',
//                         icon: 'success',
//                         confirmButtonText: 'OK'
//                     });
//                     $addMovieModal.hide();  // Close modal
//                     loadMovies();  // Reload the movies
//                 })
//                 .catch(() => {
//                     Swal.fire({
//                         title: 'Error!',
//                         text: 'Failed to add movie.',
//                         icon: 'error',
//                         confirmButtonText: 'OK'
//                     });
//                 });
//         });
//
//         // Load all movies on page load
//         loadMovies();
//     });
//
//     // Confirm deletion of a movie
//     const confirmDelete = (movieId) => {
//         Swal.fire({
//             title: 'Are you sure?',
//             text: 'You won\'t be able to revert this!',
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#d33',
//             cancelButtonColor: '#3085d6',
//             confirmButtonText: 'Yes, delete it!'
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 deleteMovie(movieId) // Call API to delete movie
//                     .then(() => {
//                         Swal.fire(
//                             'Deleted!',
//                             'Movie has been deleted.',
//                             'success'
//                         );
//                         loadMovies();  // Reload movies
//                     })
//                     .catch(() => {
//                         Swal.fire(
//                             'Error!',
//                             'Movie could not be deleted.',
//                             'error'
//                         );
//                     });
//             }
//         });
//     };
//     loadMovies();
// Show loading spinner while fetching movies
//     $loadingMessage.show();
//
//
//     // Show add movie modal
//     $addMovieBtn.on('click', () => {
//         $addMovieModal.show();
//     });
//
//     // Close add movie modal
//     $closeModalBtn.on('click', () => {
//         $addMovieModal.hide();
//     });
//
//     // Go back to movies list
//     $backBtn.on('click', () => {
//         $movieDetails.hide();
//         $moviesList.show();
//
//     });

    // Load all movies on page load

