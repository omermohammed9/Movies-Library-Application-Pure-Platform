const createMovieCard = (movie) => {
    return `
        <div class="col-md-4">
            <div class="card movie-card shadow-sm mb-4 position-relative" data-id="${movie.id}">
                <img src="${movie.image_url}" class="card-img-top" alt="${movie.title}">
                <div class="card-body">
                    <h5 class="card-title">${movie.title}</h5>
                    <div class="movie-stats d-flex justify-content-between">
                        <div class="movie-year">
                            <span>${movie.release_year}</span>
                            <small>Year</small>
                        </div>
                        <div class="movie-genre">
                            <span>${movie.genre}</span>
                            <small>Genre</small>
                        </div>
                    </div>
                    <div class="mt-3 d-flex justify-content-between">
                        <button class="btn btn-sm btn-outline-primary edit-button" data-id="${movie.id}">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn btn-sm btn-outline-danger delete-button" data-id="${movie.id}">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
};
export { createMovieCard };
