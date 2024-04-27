const express = require('express');
const router = express.Router();
const Notice = require('../models/StaffManagement_Notice');


// Add a new notice
router.post('/notice', async (req, res) => {
  try {
    const { title, content, expirationDate } = req.body;
    const newNotice = new Notice({ title, content, expirationDate });
    await newNotice.save();
    res.status(201).json({ message: 'Notice added successfully', notice: newNotice });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a notice
router.put('/notice/:id', async (req, res) => {
  try {
    const { title, content, expirationDate } = req.body;
    const updatedNotice = await Notice.findByIdAndUpdate(
      req.params.id,
      { title, content, expirationDate, lastUpdated: Date.now() },
      { new: true }
    );
    res.status(200).json(updatedNotice);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a notice
router.delete('/notice/:id', async (req, res) => {
  try {
    await Notice.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Notice deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all notices
router.get('/notices', async (req, res) => {
  try {
    const notices = await Notice.find();
    res.status(200).json(notices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one notice by ID
router.get('/notice/:id', async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' });
    }
    res.status(200).json(notice);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
