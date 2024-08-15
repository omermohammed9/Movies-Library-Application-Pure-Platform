const express = require('express');
const router = express.Router();
const actorController = require('../controllers/actorController');


// Route to get all actors
router.get('/', actorController.getAllActors);

// Route to get a single actor by ID
router.get('/:id', actorController.getActorById);

// Route to create a new actor
router.post('/add', actorController.createActor);

// Route to update an existing actor
router.put('/:id', actorController.updateActor);

// Route to delete an actor
router.delete('/:id', actorController.deleteActor);

module.exports = router;