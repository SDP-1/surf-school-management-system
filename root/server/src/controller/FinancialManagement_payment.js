const express = require("express");
const router = express.Router();
const Payment = require("../models/FinancialManagement_payment");

module.exports.setPayment = async function (req, res) {
  //   console.log(req.body);

  let slip = req.file ? req.file.filename : null;

  //   let newPayment = new Payment(req.body);

  let newPayment = new Payment({
    refId: req.body.refId,
    cashType: req.body.cashType,
    Advance: req.body.Advance,
    details: req.body.details,
    comment: req.body.comment,
    status: req.body.status,
    acceptBy: req.body.acceptBy,
    totalAmount: req.body.totalAmount,
    amountPaid: req.body.amountPaid,
    amountDue: req.body.amountDue,
    slip: slip,
  });

  newPayment
    .save()
    .then((savedPayment) => {
      res.status(200).json({
        success: "Payment saved successfully",
        data: savedPayment,
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error.message,
      });
    });
};

// Get Payment
module.exports.getpayment = async function (req, res) {
  // try {
  //   const Payments = await Payment.find().exec();

  //   return res.status(200).json({
  //     success: true,
  //     existingPayment: Payments,
  //   });
  // } catch (err) {
  //   return res.status(400).json({
  //     error: err.message,
  //   });
  // }
  Payment.find()
    .then((payments) => {
      res.json(payments);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Get Payment by id
module.exports.getPaymentById = async (req, res) => {
  let userId = req.params.id;

  await Payment.findById(userId)
    .then((Payment) => {
      console.log("Freach Successfully");
      res.status(200).send(Payment);
    })
    .catch((err) => {
      console.log(err);
      console.log("Payment Freching Faild");
      res.status(400).send(err);
      //500 - internal server error
    });
};

// GET route to retrieve slip by payment ID
module.exports.getSlipById = async (req, res) => {
  try {
    // console.log(req.params.id);
    const payment = await Payment.findById(req.params.id);
    if (!payment || !payment.slip) {
      // console.log("Fetched Payment:", payment);
      return res.status(404).json({ message: "Slip not found" });
    }
    res.json({ slipUrl: payment.slip }); // Assuming 'slip' contains the URL of the slip image
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  get payment by status
exports.getPaymentByStatus = async (req, res) => {
  let status = req.params.status;

  Payment.find({ status: status })
    .then((payments) => {
      res.json(payments);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Update Payment
module.exports.updatePayment = async function (req, res) {
  Payment.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true } // This option returns the updated document
  )
    .then((updatedPayment) => {
      return res.status(200).json({
        success: "Update Successfully",
        updatedPayment: updatedPayment,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        error: err.message,
      });
    });
};

// Update route to update payment status and acceptBy
module.exports.updatePaymentStatus = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      {
        status: "confirm",
        acceptBy: req.body.acceptBy, // AcceptBy set to username sent from frontend
      },
      { new: true }
    );
    res.json(payment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Payment
module.exports.deletePayment = async function (req, res) {
  Payment.findOneAndDelete({ _id: req.params.id })
    .exec()
    .then((deletedPayment) => {
      if (!deletedPayment) {
        return res.status(404).json({
          message: "Post not found",
        });
      }

      return res.json({
        message: "Delete Successful",
        deletedPayment,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        message: "Delete Unsuccessful",
        error: err.message,
      });
    });
};
