const express = require("express");
const router = express.Router();
const {
  addOrUpdateMonthlyTarget,
  deleteMonthlyTarget,
  getMonthlyTarget,
  updateMonthlyTarget,
  getMonthlyTargetByName,
  getMonthlyTargetByNameYearAndMonth,
  updateMonthlyTargetByNameYearAndMonth,
} = require("../controller/FinancialManagement_MonthlyTargets");

// Add outgoing expense
router.post("/monthlyTarget/add", addOrUpdateMonthlyTarget);

// Remove outgoing expense
router.delete("/monthlyTarget/:id", deleteMonthlyTarget);

// Update outgoing expense
router.patch("/monthlyTarget/:id", updateMonthlyTarget);

// Get all outgoing expenses
router.get("/monthlyTarget/", getMonthlyTarget);

// Get monthlytarget by name
router.get("/monthlyTarget/byName/:name", getMonthlyTargetByName);

// Get monthly targets by name, year, and month
router.get("/monthlyTarget/byNameYearAndMonth/:name/:year/:month", getMonthlyTargetByNameYearAndMonth);

// Update monthly targets by name, year, and month
router.put("/monthlyTarget/updateByNameYearAndMonth/:name/:year/:month", updateMonthlyTargetByNameYearAndMonth);



module.exports = router;
