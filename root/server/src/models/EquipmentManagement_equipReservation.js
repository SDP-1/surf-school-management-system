const mongoose=require("mongoose");


const Schema=mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

//variables
const equipmentReservationSchema=new Schema(
    {
       
        reservationId:{
            type:String,
            required:true
        },
        equipmentId :{
            type:String,
            required:true
        },
        renterId:{
            type:String,
            required:true
        },

        reservationDate:{
            type: Date,
            required:true
        },
        returnDate:{
            type: Date,
            required:true
        },

        status:{
            type:String,
            required:true
        }
      
       
    }
)

const EquipmentReservation=mongoose.model("EquipmentReservation",equipmentReservationSchema);
module.exports=EquipmentReservation;
