const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create User schema
let transactionSchema = new Schema({
    refid : {
        type: String, 
        required: true
    },
    details : {
        type : String,
        require : true
    },
    status1 : {
        //income outgoing
        type : String,
        require : true
    },
    status2 : {
        //pending or conform or delete req
        type : String,
        require : true
    },
    acceptBy:{
        //manager id
        type : String,
        require : true
    }
});


const Transaction = mongoose.model("Transaction",transactionSchema);
module.exports = Transaction;