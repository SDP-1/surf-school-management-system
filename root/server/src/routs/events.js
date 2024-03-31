const router=require("express").Router();
const mongoose=require("mongoose");
const schema=mongoose.schema;
let event=require("../models/event");
//crud create 
 router.route("/add").post((req,res)=>{         //if add url called this body will execute

     const Title=req.body.Title;
     const Location=req.body.Location;           //request ekk widiyta request body eken ena ewa gnnwa
     const  Capacity=Number(req.body.Capacity);
     const Description=req.body.Description;
     const Image=req.body.Image;
     const Type=req.body.Type;
     const Date=req.body.Date;
     const Start=req.body.Start;
     const End=req.body.End;
     let TicketCount=0;
     

     
     const newevent=new event({
        Title,
        Location,
        Capacity,
        Description,
        Image,
        Type,
        Date,
        Start,
        End,
        TicketCount
        

     })
     newevent.save().then(()=>{                  //sending object to database with values
                res.json("Event added");       //sending a response in json format to frontend
     }).catch((err)=>{
        console.log(err);
     })
 })

 //crud read
 router.route("/").get((req,res)=>{

        event.find().then((events)=>{
            res.json(events)
        }).catch((err)=>{

            console.log(err);
        })

 })
//crud update
router.route("/update/:title").put(async(req, res) => {
    const eventTitle = req.params.title; // Get the event title from the request parameters

    const { Title, Location, Capacity, Description, Image } = req.body; // Destructure the request body
    const updateEvent = {
        Title,
        Location,
        Capacity,
        Description,
        Image
    };

    try {
        // Find and update the event based on the title
        const updatedEvent = await event.findOneAndUpdate({ Title: eventTitle }, updateEvent);
        if (updatedEvent) {
            res.status(200).send({ status: "Event updated" });
        } else {
            res.status(404).send({ status: "Event not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: "Error updating event", error: err.message });
    }
});


    router.route("/delete/:title").delete(async (req, res) => {
        try {
            const eventTitle = req.params.title;
            const deletedEvent = await event.findOneAndDelete({ Title: eventTitle });
            if (deletedEvent) {
                res.status(200).send({ status: "Event deleted", deletedEvent });
            } else {
                res.status(404).send({ status: "Event not found" });
            }
        } catch (err) {
            console.error(err);
            res.status(500).send({ status: "Error deleting event", error: err.message });
        }
    });
    
// read a one event
        router.route("/get/:title").get((req, res) => {
            let eventTitle = req.params.title;

            const ev = event.findOne({ Title: eventTitle }).then((foundEvent) => {
                if (foundEvent) {
                    res.status(200).send({ status: "Event found", event: foundEvent });
                } else {
                    res.status(404).send({ status: "Event not found" });
                }
            }).catch((err) => {
                console.log(err);
                res.status(500).send({ status: "Error with reading data", error: err.message });
            });

    
     })

//updating ticket count
router.route("/update/:title/:count").put(async (req, res) => {
    const eventTitle = req.params.title; // Get the event title from the request parameters
    const additionalTicketCount = parseInt(req.params.count); // Get the additional ticket count from the request parameters

    try {
        // Find the event based on the title
        const existingEvent = await event.findOne({ Title: eventTitle });

        if (existingEvent) {
            // If the event exists, update the ticket count by adding the additional ticket count
            existingEvent.TicketCount += additionalTicketCount;
            await existingEvent.save();
            res.status(200).send({ status: "Ticket count updated", updatedEvent: existingEvent });
        } else {
            res.status(404).send({ status: "Event not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: "Error updating ticket count", error: err.message });
    }
});

    
        
        
   
 module.exports=router;