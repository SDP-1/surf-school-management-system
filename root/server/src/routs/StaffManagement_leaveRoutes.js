const express = require('express');
const router = express.Router();
const LeaveRequest = require('../models/StaffManagement_LeaveRequest');

// Submit leave request
router.post("/request", async (req, res) => {
  try {
    const { employeeId, leaveType, startDate, endDate } = req.body;
    const newLeaveRequest = new LeaveRequest({ employeeId, leaveType, startDate, endDate });
    await newLeaveRequest.save();
    res.status(201).json({ message: 'Leave request submitted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update leave request status
router.put('/request/:id', async (req, res) => {
  try {
    const { status, adminComment } = req.body;
    const updatedRequest = await LeaveRequest.findByIdAndUpdate(
      req.params.id,
      { status, adminComment },
      { new: true }
    );
    res.status(200).json(updatedRequest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
  
// Delete leave request
router.delete('/request/:id', async (req, res) => {
  try {
    await LeaveRequest.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Leave request deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get leave request by employeeId
router.get('/request/:employeeId', async (req, res) => {
  try {
    const employeeId = req.params.employeeId;
    const leaveRequest = await LeaveRequest.findOne({ employeeId });
    if (!leaveRequest) {
      return res.status(404).json({ message: 'Leave request not found' });
    }
    res.status(200).json(leaveRequest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all leave requests
router.get('/requests', async (req, res) => {
  try {
    const leaveRequests = await LeaveRequest.find();
    res.status(200).json(leaveRequests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

  
module.exports = router;



