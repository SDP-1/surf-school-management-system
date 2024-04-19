const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
    stdname:{
        type:String,    //data type
        required:true,  //validate
    },
    sessionID:{
        type:String,    //data type
        required:true,  //validate
    },
    date:{
        type:String,
        required:true,
    },
    time:{
        type:String,
        required:true,
    },
    numOfParticipents:{
        type:Number,    //data type
        required:true,  //validate
    },
    contactNum:{
        type:String,    //data type
        required:true,  //validate
    },
    email:{
        type:String,    //data type
        required:true,  //validate
    },
    paymentMethod:{
        type:String,    //data type
        required:true,  //validate
    },
    amount:{
        type:Number,    //data type
        required:true,  //validate
    },

});

module.exports = mongoose.model(
        "ReservationModel",   //file name
        reservationSchema   //function name
)