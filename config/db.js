const db = require('./initDb.js')

db.serialize(() => {
    // Helper function to create tables
    const createTable = (query) => {
        db.run(query, (err) => {
            if (err) {
                console.error('Error creating table:', err.message);
            } else {
                console.log('Table successfully created or already exists.');
            }
        });
    };

    // Create Movies table
    createTable(`
            CREATE TABLE IF NOT EXISTS Movies (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title NVARCHAR(255) NOT NULL,
            description NVARCHAR(255) NOT NULL,
            release_year INTEGER NOT NULL,
            genre NVARCHAR(255) NOT NULL,
            director_id INTEGER,
            image_url NVARCHAR(255) NOT NULL,
            FOREIGN KEY (director_id) REFERENCES Directors(id)
            )
    `);

    // Create Directors table
    createTable(`
            CREATE TABLE IF NOT EXISTS Directors (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name NVARCHAR(255) NOT NULL,
            age INTEGER NOT NULL,
            country_of_origin NVARCHAR(255) NOT NULL
            )
    `);

    // Create Actors table
    createTable(`
            CREATE TABLE IF NOT EXISTS Actors (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name NVARCHAR(255) NOT NULL,
            age INTEGER NOT NULL,
            country_of_origin NVARCHAR(255) NOT NULL
            )
    `);

    // Create Movie_Actors table
    createTable(`
            CREATE TABLE IF NOT EXISTS Movie_Actors (
            movie_id INTEGER,
            actor_id INTEGER,
            PRIMARY KEY (movie_id, actor_id),
            FOREIGN KEY (movie_id) REFERENCES Movies(id),
            FOREIGN KEY (actor_id) REFERENCES Actors(id)
        )
    `);

    // Create Likes table
    createTable(`
            CREATE TABLE IF NOT EXISTS Likes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            movie_id INTEGER,
            FOREIGN KEY (movie_id) REFERENCES Movies(id)
        )
    `);

    // Create Comments table
    createTable(`
        CREATE TABLE IF NOT EXISTS Comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        movie_id INTEGER,
        comment NVARCHAR(255) NOT NULL,
        created_at INTEGER NOT NULL,
        FOREIGN KEY (movie_id) REFERENCES Movies(id)
            )
    `);
});

// Close the database connection
db.close();
