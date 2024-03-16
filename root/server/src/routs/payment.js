const express = require("express");
const router = express.Router();
const {
  setPayment,
  getPaymentById,
  updatePayment,
  deletePayment,
  getpayment,
} = require("../controller/payment");

// Save Payment
router.post("/payment/save", setPayment);

// Get all Payments
router.get("/payment", getpayment);

// Get Payment by ID
router.get("/payment/:id", getPaymentById);

// Update Payment
router.put("/payment/update/:id", updatePayment);

// Delete Payment
router.delete("/payment/delete/:id", deletePayment);

module.exports = router;
