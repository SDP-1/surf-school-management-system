// Import mongoose
const mongoose = require('mongoose');

// Define rental schema
const rentalSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true
    },
    passportId: {
        type: String,
        required: true
    },
    rentalStartDate: {
        type: Date,
        required: true
    },
    rentalEndDate: {
        type: Date,
        required: true
    },
    rentalItem: {
        type: String,
        required: true
    },
    pricePerDay: {
        type: Number,
        required: true
    },
    handoverItem: {
        type: String,
        required: true
    }
});

// Create a model from the schema
const Rental = mongoose.model('Rental', rentalSchema);

// Export the model
module.exports = Rental;
