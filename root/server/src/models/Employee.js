const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    eid : {
        type : String,
        required: true
    },

    name : {
        type : String,
        required: true
    },

    age :{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
   
   
    contactno:{
        type:String,
        required:true

    }



})

const Employee = mongoose.model("Employee",employeeSchema );

module.exports = Employee;