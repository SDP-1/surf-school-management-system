const mongoose=require("mongoose");


const Schema=mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

//variables
const damageEquipmentSchema=new Schema(
    {
       
        itemcode:{
            type:String,
            required:true
        },
        itemname:{
            type:String,
            required:true
        },
        damagediscription:{
            type:String,
            required:true
        },

        technicianname:{
            type:String,
            required:true
        },
        technicianemail:{
            type:String,
            required:true
        },

        assigneddate:{
            type:Date,
            required:true
        },
        deliverydate:{
            type:Date,
            required:true
        },
        repaircost:{
            type:String,
            required:true
        }
       
    }
)

const DamageEquipment=mongoose.model("DamageEquipment",damageEquipmentSchema);
module.exports=DamageEquipment;
