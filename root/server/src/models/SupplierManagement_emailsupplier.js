const mongoose=require("mongoose");



const Schema=mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

//variables
const supplieremailSchema=new Schema(
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

const SupplierEmail=mongoose.model("SupplierEmail",supplieremailSchema);
module.exports=SupplierEmail;