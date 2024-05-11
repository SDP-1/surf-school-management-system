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
            type:String,
            required:true
        },

        quantityrequired:{
            type:String,
            required:true
        },
        purchasetobemade:{
            type:String,
            required:true
        },
        availableequipment:{
            type:String,
            required:true
        },
        rentalequipment:{
            type:String,
            required:true
        },
        damageequipment:{
            type:String,
            required:true
        },
        suppliername:{
            type:String,
            required:true
        },
        supplieremail:{
            type:String,
            required:true
        },
       
    }
)

const Equipment=mongoose.model("Equipment",equipmentSchema);
module.exports=Equipment;
