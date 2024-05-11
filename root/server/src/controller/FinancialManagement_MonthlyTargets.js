const express = require("express");
const router = express.Router();
const MonthlyTarget = require("../models/FinancialManagement_MonthlyTargets"); // Adjust the path to your model file

// Add monthly target
const addOrUpdateMonthlyTarget = async (req, res) => {
  try {
    const { name, year, month, amount } = req.body;

    // Check if a monthly target with the same year, name, and month already exists
    let existingMonthlyTarget = await MonthlyTarget.findOne({
      name,
      year,
      month,
    });

    if (existingMonthlyTarget) {
      // If it exists, call updateMonthlyTargetByNameYearAndMonth to update the existing monthly target
      existingMonthlyTarget = await updateMonthlyTargetByNameYearAndMonth(
        req,
        res
      );
      return res.json(existingMonthlyTarget);
    }

    // If it doesn't exist, create a new MonthlyTarget instance
    const monthlyTarget = new MonthlyTarget({
      name,
      year,
      month,
      amount,
    });

    // Save the new monthly target
    const savedMonthlyTarget = await monthlyTarget.save();

    // Respond with the saved monthly target
    res.json(savedMonthlyTarget);
  } catch (error) {
    // Handle errors
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
    const { name, year, month, amount } = req.body;
    const updatedMonthlyTarget = await MonthlyTarget.findByIdAndUpdate(
      req.params.id,
      { name, year, month, amount },
      { new: true }
    );
    return updatedMonthlyTarget;
  } catch (error) {
    throw new Error(error.message);
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

// Get monthly targets by name
const getMonthlyTargetByName = async (req, res) => {
  let name = req.params.name;
  try {
    const monthlyTargets = await MonthlyTarget.find({ name: name });
    res.json(monthlyTargets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get monthly targets by name, year, and month
const getMonthlyTargetByNameYearAndMonth = async (req, res) => {
  let { name, year, month } = req.params;
  try {
    const monthlyTargets = await MonthlyTarget.find({ name, year, month });
    res.json(monthlyTargets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateMonthlyTargetByNameYearAndMonth = async (req, res) => {
  try {
    const { name, year, month, amount } = req.body;

    // Find the monthly target by name, year, and month
    let existingMonthlyTarget = await MonthlyTarget.findOneAndUpdate(
      { name, year, month },
      { name, year, month, amount },
      { new: true, upsert: true } // Upsert option: create if not exists
    );

    // Respond with the updated monthly target
    res.json(existingMonthlyTarget);
  } catch (error) {
    // Handle errors
    res.status(400).json({ message: error.message });
  }
};


module.exports = {
  addOrUpdateMonthlyTarget,
  deleteMonthlyTarget,
  updateMonthlyTarget,
  getMonthlyTarget,
  getMonthlyTargetByName,
  getMonthlyTargetByNameYearAndMonth,
  updateMonthlyTargetByNameYearAndMonth,
};
