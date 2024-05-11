const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    name:{
        type:String,    //data type
        required:true,  //validate
    },
    type:{
        type:String,
        required:true,
    },
    instructor:{
        type:String,
        required:true,
    },
    date:{
        type:String,
        required:true,
    },
    time:{
        type:String,
        required:true,
    }
});

module.exports = mongoose.model(
        "SessionModel",   //file name
        sessionSchema    //function name
)