const { IgApiClient, IgResponseError } = require('instagram-private-api');
const router = require("express").Router();
const event = require("../models/EventManagement_event");

// Function to post to Instagram
const postToInsta = async (imageData, title,des,date) => {
    try {
        console.log("Posting image to Instagram...");

        const ig = new IgApiClient();
        ig.state.generateDevice(process.env.IG_USERNAME);
        await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);

        // Decode base64 image back to binary
        const imageBuffer = Buffer.from(imageData, 'base64');

        await ig.publish.photo({
            file: imageBuffer,
            caption: `Event name: ${title} Event description: ${des} Event date: ${date}`,

        });

        console.log("Image posted to Instagram successfully");
    } catch (error) {
        console.error("Error posting image to Instagram:", error);

        if (error instanceof IgResponseError) {
            console.error("Instagram API error:");
            // Handle specific Instagram API errors
            // For example, handle rate limit errors, invalid credentials, etc.
        } else {
            // Handle other errors
            console.error("Unknown error:", error);
        }

        throw error; // Rethrow the error for further handling
    }
}

// Route to add an event
router.route("/add").post(async (req, res) => {
    try {
        console.log("Received request to add event:", req.body);

        // Extract request body data
        const { Title, Location, Capacity, Description, Image, Type, Date, Start, End } = req.body;

        // Create a new event object
        const newEvent = new event({
            Title,
            Location,
            Capacity: Number(Capacity),
            Description,
            Image,
            Type,
            Date,
            Start,
            End,
            TicketCount: 0
        });

        // Save the event to the database
        await newEvent.save();
        console.log("Event saved to the database");
        
        // Upload image to Instagram
        await uploadImageToInstagram(Image, Title,Description,Date);

        // Send response
        res.json("Event added successfully");
    } catch (error) {
        console.error("Error adding event:", error);
        res.status(500).json("Error adding event");
    }
});

// Function to upload image to Instagram after event creation
const uploadImageToInstagram = async (imageData, title,des,date) => {
    try {
        // Remove data URL prefix if present
        const base64String = imageData.split(',')[1];
        // Decode base64 image string
        const imageBuffer = Buffer.from(base64String, 'base64');

        // Call postToInsta function to upload the image to Instagram
        await postToInsta(imageBuffer, title,des,date);
    } catch (error) {
        console.error("Error uploading image to Instagram:", error);
        // Handle error if needed
    }
}


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