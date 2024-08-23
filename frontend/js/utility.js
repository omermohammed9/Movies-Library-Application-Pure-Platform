// Utility function to collect movie data from the form
const collectMovieData = (formData) => {
    console.log(formData.get('title'));
    console.log(formData.get('description'));
    console.log(formData.get('release_year'));
    console.log(formData.get('add-genre'));
    console.log(formData.get('image_url'));
    console.log(formData.get('director_name'));
    console.log(formData.get('actors'));

    return{
        title: formData.get('title'),
        description: formData.get('description'),
        release_year: formData.get('release_year'),
        genre: formData.get('add-genre'),
        image_url: formData.get('image_url'),
        director_name: formData.get('director_name'),
        actors: formData.get('actors').split(',').map(name => name.trim()).filter(Boolean),
    }
};

// Utility function to collect director data from the form
const collectDirectorData = (formData) => {
    console.log(formData.get('director_name'));  // Should log the director's name
    console.log(formData.get('director_age'));   // Should log the director's age
    console.log(formData.get('director_country')); // Should log the director's country
    return {
        name: formData.get('director_name'),
        age: formData.get('director_age'),
        country_of_origin: formData.get('director_country'),
    };
};


// Utility function to collect actors data from the form
const collectActorsData = (formData) => {
    const actorsString = formData.get('actors');
    console.log("Actors from form:", actorsString);  // Log actors input

    const actorNames = formData.get('actors')
        ? formData.get('actors').split(',').map(name => name.trim()).filter(Boolean)  // Ensure valid names
        : [];
    console.log("Filtered actor names:", actorNames);

    const actorAgesString = formData.get('actor_ages');
    console.log("Actor Ages from form:", actorAgesString);
    const actorAges = actorAgesString ? actorAgesString.split(',').map(age => age.trim()) : [];

    const actorCountriesString = formData.get('actor_countries');
    console.log("Actor Countries from form:", actorCountriesString);
    const actorCountries = actorCountriesString ? actorCountriesString.split(',').map(country => country.trim()) : [];

    console.log("Actor Data - Names:", actorNames, "Ages:", actorAges, "Countries:", actorCountries);

    // Ensure all arrays have the same length
    if (actorNames.length !== actorAges.length || actorNames.length !== actorCountries.length) {
        throw new Error('Invalid input: actor names, ages, and countries must have the same length.');
    }

    return actorNames.map((name, index) => ({
        name,
        age: actorAges[index] || '',
        country_of_origin: actorCountries[index] || '',
    }));
};

 export { collectMovieData, collectDirectorData, collectActorsData };