// Worksheet.js

const mongoose = require('mongoose');

const worksheetSchema = new mongoose.Schema({
    Eid: {
        type: String,
        required: true
    },
    Ename: {
        type: String,
        required: true
    },
    Role: {
        type: String,
        required: true
    },
    Monday: {
        type: String,
        enum: ['7-12 Morning', '12-6 Evening', 'Day', 'Night', 'Full Day', 'Off Day'], // Updated enum values
        default: null
    },
    Tuesday: {
        type: String,
        enum: ['7-12 Morning', '12-6 Evening', 'Day', 'Night', 'Full Day', 'Off Day'],
        default: null
    },
    Wednesday: {
        type: String,
        enum: ['7-12 Morning', '12-6 Evening', 'Day', 'Night', 'Full Day', 'Off Day'],
        default: null
    },
    Thursday: {
        type: String,
        enum: ['7-12 Morning', '12-6 Evening', 'Day', 'Night', 'Full Day', 'Off Day'],
        default: null
    },
    Friday: {
        type: String,
        enum: ['7-12 Morning', '12-6 Evening', 'Day', 'Night', 'Full Day', 'Off Day'],
        default: null
    },
    Saturday: {
        type: String,
        enum: ['7-12 Morning', '12-6 Evening', 'Day', 'Night', 'Full Day', 'Off Day'],
        default: null
    },
    Sunday: {
        type: String,
        enum: ['7-12 Morning', '12-6 Evening', 'Day', 'Night', 'Full Day', 'Off Day'],
        default: null
    }
});

const Worksheet = mongoose.model('Worksheet', worksheetSchema);

module.exports = Worksheet;
