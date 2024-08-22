const createCarouselItem = (movie, isActive = false) => {
    return `
        <div class="carousel-item ${isActive ? 'active' : ''}">
            <img src="${movie.image_url}" class="d-block w-100" alt="${movie.title}">
            <div class="carousel-caption d-none d-md-block">
                <h5>${movie.title}</h5>
                <p>${movie.genre} | ${movie.release_year}</p>
            </div>
        </div>
    `;
};

const populateCarousel = (movies) => {
    const carouselInner = document.querySelector('.carousel-inner');
    carouselInner.innerHTML = ''; // Clear previous entries

    if (Array.isArray(movies)) {
        movies.forEach((movie, index) => {
            carouselInner.innerHTML += createCarouselItem(movie, index === 0); // Mark the first item as active
        });
    } else {
        console.error('Invalid movies data:', movies);
        // You might want to display an error message in the carousel
        carouselInner.innerHTML = `<div class="carousel-item active">
                                        <p class="text-center text-danger">No valid movies available.</p>
                                   </div>`;
    }
};

export { createCarouselItem, populateCarousel };