// routes/worksheetRoutes.js

const express = require('express');
const router = express.Router();
const Worksheet = require('../models/Worksheet');

router.post('/addw', (req, res) => {
    const { Eid, Ename, Role, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday } = req.body;

    const newWorksheet = new Worksheet({
        Eid,
        Ename,
        Role,
        Monday,
        Tuesday,
        Wednesday,
        Thursday,
        Friday,
        Saturday,
        Sunday
    });

    newWorksheet.save()
        .then(() => res.json('Worksheet added'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/w', (req, res) => {
    Worksheet.find()
        .then(worksheets => res.json(worksheets))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.put('/updatew/:Eid', (req, res) => {
    const up = req.params.Eid;
    const {  Eid,Ename,Role, Monday,Tuesday, Wednesday,Thursday, Friday,Saturday,Sunday} = req.body;
    const updateWorksheet={
        Eid,
        Ename,
        Role,
        Monday,
        Tuesday,
        Wednesday,
        Thursday,
        Friday,
        Saturday,
        Sunday
    }
    Worksheet.findOneAndUpdate({Eid:up},updateWorksheet )
        .then(() => res.json('Worksheet updated'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.delete('/deletew/:Eid', (req, res) => {
    const up = req.params.Eid;
    Worksheet.findOneAndDelete({Eid:up})
        .then(() => res.json('Worksheet deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/w/:id', (req, res) => {
    Worksheet.findOne(req.params.Eid)
        .then(worksheet => res.json(worksheet))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
