const express = require("express");
const router = express.Router();
const {
  setTransaction,
  getTransaction,
  getTransactionById,
  getTransactionByStatus,
  updateTransactionById,
  deleteTransactionById,
} = require("../controller/Transaction");

// Save Transaction
router.post("/transaction/save", setTransaction);

// Get all Transactions
router.get("/transaction", getTransaction);

// Get Transaction by ID
router.get("/transaction/:id", getTransactionById);

// Get Transactions by Status
router.get("/transaction/status/:status", getTransactionByStatus);

// Update Transaction by ID
router.put("/transaction/update/:id", updateTransactionById);

// Delete Transaction by ID
router.delete("/transaction/delete/:id", deleteTransactionById);

module.exports = router;
