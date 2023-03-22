const express = require('express') // Import the Express.js library   
const router = express.Router(); // Creates a new router object from the Express.js library
const carController = require('../controllers/car.contoller') // Imports the car controller

//GET all cars 
router.get('/cars', carController.getCars);

//GET older cars
router.get('/cars/older', carController.getOlderCars);

//POST a new car 
router.post('/cars', carController.createCar);

// PUT/UPDATE a specific car by ID
router.put('/cars', carController.updateCar);

// PUT/UPDATE multiple cars
router.put('/cars/checked', carController.updateCars);

// DELETE a specific car by ID
router.delete('/cars', carController.deleteCar);

module.exports = router; // Exports the router object 

