const mongoose=require("mongoose");


const Schema=mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

//variables
const equipmentSchema=new Schema(
    {
       
        itemno:{
            type:String,
            required:true
        },
        itemname:{
            type:String,
            required:true
        },
        itemdiscription:{
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
        availableitems:{
            type:String,
            required:true
        },
        rentalitems:{
            type:String,
            required:true
        },
        damageitems:{
            type:String,
            required:true
        },
       
    }
)

const Equipment=mongoose.model("Equipment",equipmentSchema);
module.exports=Equipment;
