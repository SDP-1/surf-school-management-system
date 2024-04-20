const mongoose=require("mongoose");



const Schema=mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

//variables
const emailSchema=new Schema(
    {
       
        to:{
            type:String,
            required:true
        },
        subject:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        }
        

        
    }
)

const TechnicianEmail=mongoose.model("TechnicianEmail",emailSchema);
module.exports=TechnicianEmail;
