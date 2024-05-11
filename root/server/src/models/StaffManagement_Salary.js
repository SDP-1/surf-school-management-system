const mongoose = require('mongoose');

const salarySchema = new mongoose.Schema({
    employeeID: { type: String, required: true },
    employeeName: { type: String, required: true },
    baseSalary: { type: Number, required: true },
    bonus: { type: Number, default: 0 },
    paymentMethod: { type: String, required: true },
    notes: { type: String },
    paymentDate: { type: Date, required: true },
    status: { type: String, default: 'pending' } // Default status is 'pending'
});

// Middleware to update status to 'pending' when updating a document
salarySchema.pre('findOneAndUpdate', function(next) {
    this._update.status = 'pending';
    next();
});

// Define a virtual property to calculate netSalary
salarySchema.virtual('netSalary').get(function() {
    return this.baseSalary + this.bonus;
});

// Create a model based on the schema
const Salary = mongoose.model('Salary', salarySchema);

module.exports = Salary;
