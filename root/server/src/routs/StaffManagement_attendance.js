const express = require('express');
const router = express.Router();
const Attendance = require('../models/StaffManagement_Attendance');
const xlsx = require('xlsx');
const multer = require('multer');

// Multer configuration for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Add attendance record
router.post('/addtt', async (req, res) => {
    try {
        const { eid, name, date } = req.body;
        const attendance = new Attendance({ eid, name, date });
        await attendance.save();
        res.status(201).send(attendance);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Update attendance record
router.put('/uptt/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { eid, name, date } = req.body;
        const attendance = await Attendance.findByIdAndUpdate(id, { eid, name, date }, { new: true });
        res.send(attendance);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete attendance record
router.delete('/dtt/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const attendance = await Attendance.findByIdAndDelete(id);
        res.send(attendance);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get attendance record for a specific day
router.get('/day/:date', async (req, res) => {
    try {
        const { date } = req.params;
        const attendance = await Attendance.find({ date });
        res.send(attendance);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get attendance record for a specific employee
router.get('/ttemployee/:eid', async (req, res) => {
    try {
        const { eid } = req.params;
        const attendance = await Attendance.find({ eid });
        res.send(attendance);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get attendance count for a specific employee
router.get('/employee/:eid/count', async (req, res) => {
    try {
        const { eid } = req.params;
        const count = await Attendance.countDocuments({ eid });
        res.send({ count });
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all attendance records
router.get('/all', async (req, res) => {
    try {
        const allAttendance = await Attendance.find();
        res.send(allAttendance);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Add attendance records from uploaded spreadsheet
router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No files were uploaded.');
        }

        const workbook = xlsx.read(req.file.buffer);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const attendanceData = xlsx.utils.sheet_to_json(sheet);

        // Map the column names to corresponding fields in the Attendance model
        const mappedAttendanceData = attendanceData.map(item => ({
            date: item.Date,
            eid: item.EmployeeID,
            name: item.Name
        }));

        await Attendance.insertMany(mappedAttendanceData);

        res.status(201).send('Attendance records from spreadsheet added successfully.');
    } catch (error) {
        console.error('Error uploading attendance records:', error);
        res.status(500).send('Internal server error');
    }
});

// Get attendance count for a specific date
router.get('/date/:date/count', async (req, res) => {
    try {
        const { date } = req.params;
        const count = await Attendance.countDocuments({ date });
        res.send({ count });
    } catch (error) {
        res.status(400).send(error);
    }
});


module.exports = router;
