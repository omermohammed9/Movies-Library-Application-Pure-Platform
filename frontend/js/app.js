import { fetchMovies, deleteMovie, editMovie } from './api.js';
import { createMovieCard } from "./movieCard.js";
import { submitForm } from "./submitform.js";
import { populateCarousel } from "./carouselItem.js";

$(document).ready(() => {
    const $moviesList = $('#movies-container');
    const $addMovieModal = new bootstrap.Modal(document.getElementById('add-movie-modal'));
    const $editMovieModal = new bootstrap.Modal(document.getElementById('edit-movie-modal'));
    const $addMovieForm = $('#add-movie-form');
    const $editMovieForm = $('#edit-movie-form');

    const showAlert = (title, text, icon) => {
        Swal.fire({ title, text, icon, confirmButtonText: 'OK' });
    };

    const loadMovies = async () => {
        try {
            const movies = await fetchMovies();
            $moviesList.empty();

            if (!movies || movies.length === 0) {
                $moviesList.html('<p>No movies available. Add one!</p>');
            } else {
                movies.forEach(movie => $moviesList.append(createMovieCard(movie)));
                populateCarousel(movies);
            }
            attachEventListeners();
        } catch (error) {
            console.error('Failed to fetch movies:', error);
            showAlert('Error!', 'Failed to load movies.', 'error');
        }
    };

    const attachEventListeners = () => {
        $(document).on('click', '.delete-button', function (e) {
            e.stopPropagation();
            confirmDelete($(this).data('id'));
        });

        $(document).on('click', '.edit-button', function (e) {
            e.stopPropagation();
            e.preventDefault();
            loadMovieDetailsForEdit($(this).data('id'));
        });

        $(document).on('click', '.movie-card', function () {
            const movieId = $(this).data('id');
            if (movieId) {
                window.location.href = `./frontend/movie-details.html?id=${movieId}`;
            }
        });
    };

    const loadMovieDetailsForEdit = async (movieId) => {
        try {
            const response = await fetch(`http://localhost:1010/movies/${movieId}`);
            if (!response.ok) throw new Error('Failed to fetch movie details');
            const movie = await response.json();
            populateEditForm(movie);
            $editMovieModal.show();
        } catch (error) {
            console.error('Error fetching movie details:', error);
            showAlert('Error!', 'Failed to load movie details.', 'error');
        }
    };

    const populateEditForm = (movie) => {
        $('#edit-title').val(movie.title);
        $('#edit-description').val(movie.description);
        $('#edit-release_year').val(movie.release_year);
        $('#edit-genre').val(movie.genre);
        $('#edit-image_url').val(movie.image_url);
        $('#edit-movie-id').val(movie.id);
    };

    const confirmDelete = async (movieId) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                await deleteMovie(movieId);
                showAlert('Deleted!', 'Movie has been deleted.', 'success');
                loadMovies();
            } catch (error) {
                showAlert('Error!', 'Movie could not be deleted.', 'error');
            }
        }
    };

    $addMovieForm.on('submit', async function (e) {
        e.preventDefault();
        try {
            await submitForm.call(this);
            showAlert('Success!', 'Movie added successfully.', 'success');
            $addMovieModal.hide();
            this.reset();
            loadMovies();
        } catch (error) {
            showAlert('Error!', 'Failed to add movie.', 'error');
        }
    });

    $editMovieForm.on('submit', async function (e) {
        e.preventDefault();
        try {
            const movieId = $('#edit-movie-id').val();
            const formData = {
                title: $('#edit-title').val(),
                description: $('#edit-description').val(),
                release_year: $('#edit-release_year').val(),
                genre: $('#edit-genre').val(),
                image_url: $('#edit-image_url').val(),
            };
            await editMovie(movieId, formData);
            showAlert('Success!', 'Movie updated successfully.', 'success');
            $editMovieModal.hide();
            this.reset();
            loadMovies();
        } catch (error) {
            showAlert('Error!', 'Failed to update movie.', 'error');
        }
    });

    loadMovies();
});
