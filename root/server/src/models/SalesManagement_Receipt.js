const mongoose = require('mongoose');

const receiptSchema = new mongoose.Schema({
  receiptId: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  finalAmount: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Receipt = mongoose.model('Receipt', receiptSchema);

module.exports = Receipt;
