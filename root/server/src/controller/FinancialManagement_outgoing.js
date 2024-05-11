const express = require("express");
const router = express.Router();
const Outgoing = require("../models/FinancialManagement_outgoing");

module.exports.setOutgoing = async function (req, res) {

  let newOutgoing = new Outgoing({
    refId: req.body.refId,
    details: req.body.details,
    comment: req.body.comment,
    status: req.body.status,
    acceptBy: req.body.acceptBy,
    amount: req.body.amount,
  });

  newOutgoing
    .save()
    .then((savedOutgoing) => {
      res.status(200).json({
        success: "Outgoing saved successfully",
        data: savedOutgoing,
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error.message,
      });
    });
};

// Get Outgoing
module.exports.getOutgoing = async function (req, res) {
  Outgoing.find()
    .then((outgoings) => {
      res.json(outgoings);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Get Outgoing by id
module.exports.getOutgoingById = async (req, res) => {
  let userId = req.params.id;

  await Outgoing.findById(userId)
    .then((Outgoing) => {
      console.log("Freach Successfully");
      res.status(200).send(Outgoing);
    })
    .catch((err) => {
      console.log(err);
      console.log("Outgoing Freching Faild");
      res.status(400).send(err);
      //500 - internal server error
    });
};

//  get outgoing by status
exports.getOutgoingByStatus = async (req, res) => {
  let status = req.params.status;

  Outgoing.find({ status: status })
    .then((payments) => {
      res.json(payments);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Update Outgoing
module.exports.updateOutgoing = async function (req, res) {
  Outgoing.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true } // This option returns the updated document
  )
    .then((updatedOutgoing) => {
      return res.status(200).json({
        success: "Update Successfully",
        data: updatedOutgoing,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        error: err.message,
      });
    });
};

// Update route to update outgoing status and acceptBy
module.exports.updateOutgoingStatus = async (req, res) => {
  try {
    const outgoing = await Outgoing.findByIdAndUpdate(
      req.params.id,
      {
        status: "confirm",
        acceptBy: req.body.acceptBy, // AcceptBy set to username sent from frontend
      },
      { new: true }
    );
    res.json(outgoing);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Outgoing
module.exports.deleteOutgoing = async function (req, res) {
  Outgoing.findOneAndDelete({ _id: req.params.id })
    .exec()
    .then((deletedOutgoing) => {
      if (!deletedOutgoing) {
        return res.status(404).json({
          message: "Post not found",
        });
      }

      return res.json({
        message: "Delete Successful",
        deletedOutgoing,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        message: "Delete Unsuccessful",
        error: err.message,
      });
    });
};
