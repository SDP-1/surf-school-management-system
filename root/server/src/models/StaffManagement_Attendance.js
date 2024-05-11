const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    eid: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;