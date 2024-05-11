const express = require("express");
const router = express.Router();

const {
  setOutgoing,
  getOutgoing,
  getOutgoingById,
  getOutgoingByStatus,
  updateOutgoing,
  updateOutgoingStatus,
  deleteOutgoing,
} = require("../controller/FinancialManagement_outgoing");

// Save outgoing
router.post("/outgoing/save", setOutgoing);

// Get all outgoings
router.get("/outgoing", getOutgoing);

//Get outgoing by id
router.get("/outgoing/:id", getOutgoingById);

//get outgoing by status
router.get("/outgoing/status/:status", getOutgoingByStatus);

//update outgoing by id
router.put("/outgoing/update/:id", updateOutgoing);

//update outgoing status to conform
router.put("/outgoing/confirm/:id", updateOutgoingStatus);

//delete outgoing
router.delete("/outgoing/delete/:id", deleteOutgoing);

module.exports = router;
