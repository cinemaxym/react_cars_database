const mongoose = require('mongoose'); // Import the Mongoose library 

//Define a Mongoose schema for a Car document 
let CarSchema = mongoose.Schema({
    make: {
        type: String,
        required:true
    },
    model: {
        type: String,
        required:true
    },
    year: {
        type: Number,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    }, 
    checked: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Car', CarSchema) //Export a Mongoose model for the CarSchema as a Car document.