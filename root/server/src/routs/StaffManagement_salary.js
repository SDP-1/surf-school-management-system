const express = require('express');
const router = express.Router();
const Salary = require('../models/StaffManagement_Salary');

// Route to get all salaries
router.get('/alls', async (req, res) => {
    try {
        const salaries = await Salary.find({}, { status: 0 });
        res.json(salaries);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route to get a specific salary by ID
router.get('/salary/:id', getSalary, (req, res) => {
    res.json(res.salary);
});

// Route to add a new salary
router.post('/adds', async (req, res) => {
    const salary = new Salary({
        employeeID: req.body.employeeID,
        employeeName: req.body.employeeName,
        baseSalary: req.body.baseSalary,
        bonus: req.body.bonus,
        paymentMethod: req.body.paymentMethod,
        notes: req.body.notes,
        paymentDate: req.body.paymentDate,
        status: 'pending' // Default status is 'pending' for new salaries
    });

    try {
        const newSalary = await salary.save();
        res.status(201).json(newSalary);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route to update a salary
router.patch('/salary/:id', getSalary, async (req, res) => {
    if (req.body.baseSalary != null) {
        res.salary.baseSalary = req.body.baseSalary;
    }
    if (req.body.bonus != null) {
        res.salary.bonus = req.body.bonus;
    }
    if (req.body.paymentMethod != null) {
        res.salary.paymentMethod = req.body.paymentMethod;
    }
    if (req.body.notes != null) {
        res.salary.notes = req.body.notes;
    }
    if (req.body.paymentDate != null) {
        res.salary.paymentDate = req.body.paymentDate;
    }
    // Update the status only if it's an update
    if (req.body.status != null && res.salary.status === 'pending') {
        res.salary.status = req.body.status;
    }

    try {
        const updatedSalary = await res.salary.save();
        res.json(updatedSalary);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route to delete a salary
router.delete('/salary/:id', getSalary, async (req, res) => {
    try {
        await res.salary.remove();
        res.json({ message: 'Deleted Salary' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware function to get salary by ID
async function getSalary(req, res, next) {
    let salary;
    try {
        salary = await Salary.findById(req.params.id);
        if (salary == null) {
            return res.status(404).json({ message: 'Salary not found' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.salary = salary;
    next();
}

module.exports = router;
