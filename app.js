const express = require('express');
const app = express();
const movieRoute = require('./routes/movieRoute');
const directorRoute = require('./routes/directorRoute');
const actorRoute = require('./routes/actorRoute');
const likeRoute = require('./routes/likeRoute');
const commentRoute = require('./routes/commentRoutes');
const cors = require('cors');

app.use(express.json());
// app.use(express.static('movieDetails'));
app.use(cors());


app.use('/movies', movieRoute);
app.use('/directors', directorRoute);
app.use('/actors', actorRoute);
app.use('/likes', likeRoute);
app.use('/comments', commentRoute);



// Error handling middleware (optional)
app.use((err, req, res, next) => {
    console.log(`Incoming request for ${req.url}`);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    // console.error(err.stack);
    res.status(500).send('Something broke!');
    next();
});

module.exports = app;