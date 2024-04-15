const express = require("express");
const router = express.Router();
const {
  addMonthlyTarget,
  deleteMonthlyTarget,
  getMonthlyTarget,
  updateMonthlyTarget,
  getMonthlyTargetByName,
} = require("../controller/FinancialManagement_MonthlyTargets");

// Add outgoing expense
router.post("/monthlyTarget/add", addMonthlyTarget);

// Remove outgoing expense
router.delete("/monthlyTarget/:id", deleteMonthlyTarget);

// Update outgoing expense
router.patch("/monthlyTarget/:id", updateMonthlyTarget);

// Get all outgoing expenses
router.get("/monthlyTarget/", getMonthlyTarget);

// Get monthlytarget by name
router.get("/monthlyTarget/byName/:name", getMonthlyTargetByName);

module.exports = router;
