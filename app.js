const mongoose = require("mongoose")  // Import the Mongoose library 
const express = require("express") // Import the Express.js library 
const apiRoutes = require('./routes/apiRoutes') // Import the API routes from the apiRoutes.js file
const app = express()  // Create an instance of the Express.js application

const PORT = process.env.PORT || 3001 // Set the server's port to either the environment variable PORT or the port number 3001

app.use(express.json()); // Set up middleware to parse incoming JSON data
app.use('/api', apiRoutes); // Mount the API routes to the '/api' endpoint

// Connect to the MongoDB database using the provided connection string
mongoose.connect('mongodb+srv://')
.then(() => console.log('Connected to MongoDB')) // Log a success message if the connection is successful
.catch((error) => // Log an error message if the connection fails
console.log('Error connecting to MongoDB:', error.message));

// Start the server and listen for incoming requests on the specified port
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})



