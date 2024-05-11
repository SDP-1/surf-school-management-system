const mongoose=require("mongoose");
const schema=mongoose.Schema;
const eventschema=new schema({

    Title:{
        type:String,
        required:true

    },
    Location:{
        type:String,
        required:true

    },
    Capacity:{
        type:Number,
        required:true

    },
    Description:{
        type:String,
        required:true

    },
    Image: {
        type: String, // Store image data as a string (base64)
       
    },
    Type: {
        type: String, 
       
    },
    Date: {
        type: Date, 
       
    },
    Start: {
        type: String, 
       
    },
    End: {
        type:String, 
       
    },
    TicketCount: {
        type: Number, 
       
    },
    Price:{
        type: Number, 
    }
})

const event=mongoose.model("Event",eventschema);
module.exports=event;