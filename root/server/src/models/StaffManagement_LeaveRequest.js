const mongoose = require('mongoose');

const leaveRequestSchema = new mongoose.Schema({
  employeeId: { type: String, required: true },
  leaveType: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, default: 'pending' }, // Default status is 'pending'
  adminComment: { type: String }
});

module.exports = mongoose.model('LeaveRequest', leaveRequestSchema);

