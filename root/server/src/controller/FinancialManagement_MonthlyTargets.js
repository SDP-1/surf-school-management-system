const express = require("express");
const router = express.Router();
const MonthlyTarget = require("../models/FinancialManagement_MonthlyTargets");

// Add monthly target
const addMonthlyTarget = async (req, res) => {
  try {
    const { name, amount } = req.body;
    const monthlyTarget = new MonthlyTarget({
      name,
      amount,
    });
    const savedMonthlyTarget = await monthlyTarget.save();
    res.json(savedMonthlyTarget);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Remove monthly target
const deleteMonthlyTarget = async (req, res) => {
  try {
    const deletedMonthlyTarget = await MonthlyTarget.findByIdAndDelete(
      req.params.id
    );
    res.json(deletedMonthlyTarget);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update monthly target
const updateMonthlyTarget = async (req, res) => {
  try {
    const { name, amount } = req.body;
    const updatedMonthlyTarget = await MonthlyTarget.findByIdAndUpdate(
      req.params.id,
      { name, amount },
      { new: true }
    );
    res.json(updatedMonthlyTarget);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all monthly targets
const getMonthlyTarget = async (req, res) => {
  try {
    const monthlyTargets = await MonthlyTarget.find();
    res.json(monthlyTargets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get transactions by name
const getMonthlyTargetByName = async (req, res) => {
  let name = req.params.name;

  MonthlyTarget.find({ name: name })
    .then((transactions) => {
      res.json(transactions);
    })
    .catch((err) => {
      console.log(err);
    });
};






module.exports = {
  addMonthlyTarget,
  deleteMonthlyTarget,
  updateMonthlyTarget,
  getMonthlyTarget,
  getMonthlyTargetByName,
};
