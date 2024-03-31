const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  setPayment,
  getPaymentById,
  updatePayment,
  deletePayment,
  getpayment,
} = require("../controller/FinancialManagement_payment");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/data/slips");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Save Payment
// router.post("/payment/save", setPayment);
router.post("/payment/save", upload.single("slip"), setPayment);

// Get all Payments
router.get("/payment", getpayment);

// Get Payment by ID
router.get("/payment/:id", getPaymentById);

// Update Payment
router.put("/payment/update/:id", updatePayment);

// Delete Payment
router.delete("/payment/delete/:id", deletePayment);

module.exports = router;
