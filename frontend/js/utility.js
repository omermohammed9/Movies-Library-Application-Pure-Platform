// Utility function to collect movie data from the form
const collectMovieData = (formData) => ({
    title: formData.get('title'),
    description: formData.get('description'),
    release_year: formData.get('release_year'),
    genre: formData.get('genre'),
    image_url: formData.get('image_url'),
});

// Utility function to collect director data from the form
const collectDirectorData = (formData) => ({
    name: formData.get('director_name'),
    age: formData.get('director_age'),
    country_of_origin: formData.get('director_country'),
});

// Utility function to collect actors data from the form
const collectActorsData = (formData) => {
    const actorNames = formData.get('actors').split(',').map(name => name.trim());
    const actorAges = formData.get('actor_ages').split(',').map(age => age.trim());
    const actorCountries = formData.get('actor_countries').split(',').map(country => country.trim());

    return actorNames.map((name, index) => (
        {
        name,
        age: actorAges[index],
        country_of_origin: actorCountries[index],
    })
    );
};
 export { collectMovieData, collectDirectorData, collectActorsData };