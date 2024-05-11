const express = require('express');
const router = express.Router();
const Receipt = require('../models/SalesManagement_Receipt');

// Add a receipt
router.post('/addrc', async (req, res) => {
  try {
    const { receiptId, description, finalAmount } = req.body;
    const receipt = new Receipt({
      receiptId,
      description,
      finalAmount
    });
    await receipt.save();
    res.status(201).json(receipt);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a receipt by ID
router.delete('/receipt/:id', async (req, res) => {
  try {
    await Receipt.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Receipt deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a receipt by ID
router.put('/receipt/:id', async (req, res) => {
  try {
    const { receiptId, description, finalAmount, updatedDate } = req.body; // Include updatedDate in the request body
    await Receipt.findByIdAndUpdate(req.params.id, {
      receiptId,
      description,
      finalAmount,
      createdAt: updatedDate // Update the createdAt field with the updatedDate
    });
    res.status(200).json({ message: 'Receipt updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a receipt by ID
router.get('/receipt/:id', async (req, res) => {
  try {
    const receipt = await Receipt.findById(req.params.id);
    if (!receipt) {
      return res.status(404).json({ message: 'Receipt not found' });
    }
    res.status(200).json(receipt);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get receipts by date (createdAt)
router.get('/receipts/date/:date', async (req, res) => {
    try {
      const startOfDay = new Date(req.params.date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(req.params.date);
      endOfDay.setHours(23, 59, 59, 999);
  
      const receipts = await Receipt.find({
        createdAt: { $gte: startOfDay, $lte: endOfDay }
      });
  
      res.status(200).json({ date: req.params.date, receipts });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // Get the sum of final amounts for a specific date
router.get('/receipts/date/:date/total', async (req, res) => {
  try {
      const startOfDay = new Date(req.params.date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(req.params.date);
      endOfDay.setHours(23, 59, 59, 999);

      const receipts = await Receipt.aggregate([
          {
              $match: {
                  createdAt: { $gte: startOfDay, $lte: endOfDay }
              }
          },
          {
              $group: {
                  _id: null,
                  totalAmount: { $sum: "$finalAmount" }
              }
          }
      ]);

      const totalAmount = receipts.length > 0 ? receipts[0].totalAmount : 0;

      res.status(200).json({ date: req.params.date, totalAmount });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});



// Get the sum of final amounts for the last thirty days
router.get('/receipts/lastthirtydays', async (req, res) => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 29); // Subtract 29 days to get the last 30 days
    const receipts = await Receipt.aggregate([
      {
        $match: {
          createdAt: { $gte: thirtyDaysAgo }
        }
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$finalAmount" }
        }
      }
    ]);
    const totalAmount = receipts.length > 0 ? receipts[0].totalAmount : 0;
    res.status(200).json({ totalAmount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get the last entered receipt ID
router.get('/receipts/last', async (req, res) => {
    try {
      const lastReceipt = await Receipt.findOne().sort({ createdAt: -1 });
      if (!lastReceipt) {
        return res.status(404).json({ message: 'No receipts found' });
      }
  
      const lastReceiptId = lastReceipt.receiptId;
      const lastReceiptNumber = parseInt(lastReceiptId.substring(2));
      const newReceiptNumber = lastReceiptNumber + 1;
      const newReceiptID = `RC${newReceiptNumber}`;
  
      res.status(200).json({ lastReceiptId: newReceiptID });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  

// Get all receipts
router.get('/receipts', async (req, res) => {
  try {
    const receipts = await Receipt.find();
    res.status(200).json(receipts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
