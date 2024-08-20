const createMovieCard = (movie) => {
    return `
        <div class="col-md-4">
            <div class="movie-card position-relative" data-id="${movie.id}">
                <img src="${movie.image_url}" alt="${movie.title}">
                <div class="card-body">
                    <h5 class="card-title">${movie.title}</h5>
                    <div class="movie-stats">
                        <div>
                            <span>${movie.release_year}</span>
                            <small>Year</small>
                        </div>
                        <div>
                            <span>${movie.genre}</span>
                            <small>Genre</small>
                        </div>
<!--                        <div>-->
<!--                            <span></span>-->
<!--                            <small></small>-->
<!--                        </div>-->
<!--                        <div>-->
<!--                            <span>45+</span>-->
<!--                            <small>Review</small>-->
<!--                        </div>-->
                    </div>
                    <div class="edit-button" data-id="${movie.id}">
                        <i class="fas fa-edit"></i>
                    </div>
                    <div class="delete-button" data-id="${movie.id}">
                        <i class="fas fa-trash"></i>
                    </div>
                </div>
            </div>
        </div>
    `;
};

export { createMovieCard };