const express = require('express');
const router = express.Router();
const directorController = require('../controllers/directorController');

// Route to get all directors
router.get('/', directorController.getAllDirectors);

// Route to get a single director by ID
router.get('/:id', directorController.getDirectorById);

// Route to create a new director
router.post('/add', directorController.createDirector);

// Route to update an existing director
router.put('/:id', directorController.updateDirector);

// Route to delete a director
router.delete('/:id', directorController.deleteDirector);

router.get('/:name', directorController.getDirectorByName);

module.exports = router;