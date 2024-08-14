const express = require('express');
const app = express();
const movieRoute = require('./routes/movieRoute');
const directorRoute = require('./routes/directorRoute');


app.use(express.json())


app.use('/movies', movieRoute);
app.use('/directors', directorRoute);


// Error handling middleware (optional)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = app;