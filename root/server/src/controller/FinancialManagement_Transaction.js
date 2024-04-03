// Save Transaction
const Transaction = require("../models/FinancialManagement_Transaction");

module.exports.setTransaction = async function (req, res) {
  let newTransaction = new Transaction(req.body);

  // console.log(req.body);

  newTransaction
    .save()
    .then((newTransaction) => {
      res.status(200).json({
        success: "newTransaction saved successfully",
        data: newTransaction,
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error.message,
      });
    });
};

// Get Transaction
module.exports.getTransaction = async function (req, res) {
  Transaction.find()
    .then((transactions) => {
      res.json(transactions);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Get Transaction by id
module.exports.getTransactionById = async (req, res) => {
  let userId = req.params.id;

  await Transaction.findById(userId)
    .then((transaction) => {
      res
        .status(200)
        .send({ status: "Freach Successfully", data: transaction });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send({ status: "Transaction Freching Faild" });
      //500 - internal server error
    });
};

// GET route to retrieve slip by Transaction ID
module.exports.getSlipById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction || !transaction.slip) {
      return res.status(404).json({ message: "Slip not found" });
    }
    res.json({ slipUrl: transaction.slip }); 
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  get transactions by status
exports.getTransactionByStatus = async (req, res) => {
  let status = req.params.status;

  Transaction.find({ incomeOrOutgoing: status })
    .then((transactions) => {
      res.json(transactions);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Update Transaction
module.exports.updateTransactionById = async function (req, res) {
  Transaction.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true } // This option returns the updated document
  )
    .then((updatedTransaction) => {
      res.status(200).send({
        success: "Transaction Update Successfully",
        data: updatedTransaction,
      });
    })
    .catch((err) => {
      res.status(400).send({
        error: err.message,
      });
    });
};

// Delete Transaction
module.exports.deleteTransactionById = async function (req, res) {
  Transaction.findOneAndDelete({ _id: req.params.id })
    .exec()
    .then((deletedTransaction) => {
      if (!deletedTransaction) {
        return res.status(404).json({
          message: "Transaction not found",
        });
      }

      return res.json({
        message: "Transaction Delete Successful",
        data: deletedTransaction,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        message: "Transaction Delete Unsuccessful",
        error: err.message,
      });
    });
};
