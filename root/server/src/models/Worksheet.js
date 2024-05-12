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
        enum: ['Day', 'Night','offday'], // Assuming shifts are either Day or Night
        default: null // Default value is null, indicating no shift scheduled
    },
    Tuesday: {
        type: String,
        enum: ['Day', 'Night','offday'],
        default: null
    },
    Wednesday: {
        type: String,
        enum: ['Day', 'Night','offday'],
        default: null
    },
    Thursday: {
        type: String,
        enum: ['Day', 'Night','offday'],
        default: null
    },
    Friday: {
        type: String,
        enum: ['Day', 'Night','offday'],
        default: null
    },
    Saturday: {
        type: String,
        enum: ['Day', 'Night','offday'],
        default: null
    },
    Sunday: {
        type: String,
        enum: ['Day', 'Night','offday'],
        default: null
    }
});

const Worksheet = mongoose.model('Worksheet', worksheetSchema);

module.exports = Worksheet;
