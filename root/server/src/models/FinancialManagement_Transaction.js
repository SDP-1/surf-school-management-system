const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create User schema
let transactionSchema = new Schema({
    // refid : {
    //     type: String, 
    //     required: true
    // },
    // details : {
    //     type : String,
    //     require : true
    // },
    // status1 : {
    //     //income outgoing
    //     type : String,
    //     require : true
    // },
    // status2 : {
    //     //pending or conform or delete req
    //     type : String,
    //     require : true
    // },
    // acceptBy:{
    //     //manager id
    //     type : String,
    //     require : true
    // }

    refId: {
        type: String,
        required: true,
      },
      date: {
        type: String, 
        required: true,
      },
      time: {
        type: String, 
        required: true,
      },
      confirmDate: {
        type: String, // Store date as string
        default: () => new Date().toISOString().substring(0, 10), // Get date in YYYY-MM-DD format
      },
      confirmTime: {
        type: String, // Assuming time is stored as a string
        default: getTime, // Set default value to current time
      },
      cashType: {
        type: String,
        required: true,
      },
      Advance: {
        type: Boolean,
        default: false,
        required: true,
      },
      details: {
        type: String,
      },
      comment: {
        type: String,
      },
      status: { // payment compleate or not
        type: Boolean,
        default: true,
      },
      acceptBy: {
        type: String,
      },
      totalAmount: {
        type: Number,
        default: 0,
        requied: true,
      },
      amountPaid: {
        type: Number,
        default: 0,
        requied: true,
      },
      amountDue: {
        type: Number,
        default: 0,
        required: true,
      },
      incomeOrOutgoing: {
        type: String,
        required: true,
      },
      slip: {
        type: String,
      },
});

function getTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0"); // Ensure two digits for hours
    const minutes = String(now.getMinutes()).padStart(2, "0"); // Ensure two digits for minutes
    return `${hours}:${minutes}`;
  }

const Transaction = mongoose.model("Transaction",transactionSchema);
module.exports = Transaction;