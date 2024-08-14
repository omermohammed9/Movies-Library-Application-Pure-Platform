const express = require('express');
const app = express();
const movieRoute = require('./routes/movieRoute');


app.use(express.json())


app.use('/movies', movieRoute);


// Error handling middleware (optional)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = app;