const express = require('express');
const app = express();
const movieRoute = require('./routes/movieRoute');
const directorRoute = require('./routes/directorRoute');
const actorRoute = require('./routes/actorRoute');
const cors = require('cors');

app.use(express.json());
// app.use(express.static('movieDetails'));
app.use(cors());


app.use('/movies', movieRoute);
app.use('/directors', directorRoute);
app.use('/actors', actorRoute);


// Error handling middleware (optional)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = app;