const mongoose=require("mongoose");


const Schema=mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

//variables
const equipmentSchema=new Schema(
    {
       
        equipmentno:{
            type:String,
            required:true
        },
        equipmentname:{
            type:String,
            required:true
        },
        equipmentdescription:{
            type:String,
            required:true
        },

        quantityinstock:{
            type:Number,
            required:true
        },

        quantityrequired:{
            type:Number,
            required:true
        },
        purchasetobemade:{
            type:Number,
            required:true
        },
        availableequipment:{
            type:Number,
            required:true
        },
        rentalequipment:{
            type:Number,
            required:true
        },
        damageequipment:{
            type:Number,
            required:true
        },
       
    }
)

const Equipment=mongoose.model("Equipment",equipmentSchema);
module.exports=Equipment;
