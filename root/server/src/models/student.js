const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create User schema
let studentSchema = new Schema({
    name : {
        type: String, 
        required: true
    },
    age : {
        type : Number,
        require : true
    },
    gender : {
        type : String,
        require : true
    }
});


const Student = mongoose.model("Student",studentSchema);
module.exports = Student;