const Car = require('../models/car.model') //Import Car Schema 
const mongoose = require('mongoose') //Import mongoose 


// List all the information for all cars in your database.
exports.getCars = async (req, res) => {
    try {
        const cars = await Car.find(); // Find all cars in the database
        res.status(200).json(cars) // Send a JSON response containing the cars
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server Error'}); // Send a 500 error response if there's an error
    }
};

// List model, make, registration number, and current owner for all cars
// older than 5 years.
exports.getOlderCars = async (req, res) => {
    try {
        const cars = await Car.find({ year: {$lt: new Date().getFullYear() - 5 }}, // Find cars with a year less than 5 years ago
        'make model year number owner') // Only return the make, model, year, number, and owner fields
        res.status(200).json(cars)  // Send a JSON response containing the older cars               
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server Error'}); // Send a 500 error response if there's an error
    }
};

//Add a car to the cars collection.
exports.createCar = async (req, res) => {
    const car = new Car ({
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        number: req.body.number,
        owner: req.body.owner,
    }); // Create a new car object with the information from the request body
    console.log(car)
    try {
        await car.save() // Save the new car object to the database
        res.status(201).json({message: 'Car created successfully', car});
    } catch (err) { // Send a JSON response indicating that the car was created successfully
        console.log(err);
        res.status(500).json({message: 'Server Error'});
    }            // Send a 500 error response if there's an error             
};

// Update information about a single car.
exports.updateCar = async (req, res) => {
    try {  // Extract the information about the car from the request body
        const { id, make, model, year, number, owner } = req.body;
        const updatedCar = await Car.findByIdAndUpdate(
            id, // Find the car with the specified ID
            { make, model, year, number, owner }, // Update the car with the new information
            { new: true }); // Return the updated car object
            if(!updatedCar) {  // Send a 404 error response if the car is not found
                return res.status(404).json({message: 'Car not found'});
            }  // Send a JSON response indicating that the car was updated successfully
            res.status(200).json({message: 'Car updated successfully', car: updatedCar});
    } catch (err) {
        console.log(err);   // Send a 500 error response if there's an error
        res.status(500).json({message: 'Server Error'});
    }
};

// Update information about more than one car.
exports.updateCars = async (req, res) => {
    try {  // Extract the information about which cars to update from the request body
        const { checked } = req.body;
        await Car.updateMany({},  // Update all car documents 
            { $set: {checked}}, { new: true });//by setting 'checked' field to the value passed in the request body.
            res.status(200).json({message: 'Cars updated successfully'}); // Return a success message.
    } catch (err) {
        console.log(err);   // Send a 500 error response if there's an error
        res.status(500).json({message: 'Server Error'});
    }
};


// Delete a specific car document.
exports.deleteCar = async (req, res) => {
    try {    // Find and delete a car document by ID passed in the request body.
        const deletedCar = await Car.findByIdAndDelete(req.body.id);
        if(!deletedCar) {  // Send a 404 error response if the car is not found
            return res.status(404).json({message: 'Car not found'});
        }   // Return a success message with the deleted car document.
        res.status(200).json({message: 'Car deleted successfully', car: deletedCar});
    } catch (err) {
        console.log(err);     // Return a server error message.
        res.status(500).json({message: 'Server Error'});
    }
}