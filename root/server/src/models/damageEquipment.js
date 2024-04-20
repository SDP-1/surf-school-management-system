const mongoose=require("mongoose");


const Schema=mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

//variables
const damageEquipmentSchema=new Schema(
    {
       damageId:{
        type:String,
        required:true
       },
        equipmentno:{
            type:String,
            required:true
        },
        equipmentname:{
            type:String,
            required:true
        },
        damagedescription:{
            type:String,
            required:true
        },

        technicianname:{
            type:String,
            required:true
        },
        technicianemail:{
            type:String,
            required:true,
            validate: {
                validator: (value) => {
                    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return re.test(String(value).toLowerCase());
                },
                message: 'Please enter a valid email address.'
            }
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
            type:Number,
            required:true
        }
       
    }
)

const DamageEquipment=mongoose.model("DamageEquipment",damageEquipmentSchema);
module.exports=DamageEquipment;
