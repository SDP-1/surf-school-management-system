const Reservation = require("../models/ReservationModel");


//display all reservations
const getAllReservations = async (req, res, next) => { 
    let reservations;
    //get all reservations
    try {
        reservations = await Reservation.find();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
    //if not found
    if (!reservations || reservations.length === 0) {
        return res.status(404).json({ message: "Reservations Not Found" });
    }
    //display all reservations
    return res.status(200).json({ reservations });
};





//insert reservation
const addReservations = async (req, res, next) => {
    const{stdname,sessionID,date,time,numOfParticipents,contactNum,email,paymentMethod,amount} = req.body;

    let reservations;

    try{
        reservations = new Reservation({stdname,sessionID,date,time,numOfParticipents,contactNum,email,paymentMethod,amount});
        await reservations.save();
    }catch(err){
        console.log(err);
        return res.status(500).send({ message: "Internal Server Error" });
    }

    //if not insert sessions
    if(!reservations){
        return res.status(404).send({message:"unable to add reservation"});
    }
    return res.status(200).json({reservations});
};




//get reservation by id
const getById = async (req, res, next) => {
    const id = req.params.id;

    let reservation;

    try{
        reservation = await Reservation.findById(id);
    }catch(err){
        console.log(err);
        return res.status(500).send({ message: "Internal Server Error" });
    }

    //if not available reservation
    if(!reservation){
        return res.status(404).send({message:"reservation not found"});
    }
    return res.status(200).json({reservation});
}





//update reservation details
const updateReservation = async(req, res, next) => {
    const id = req.params.id;
    const{stdname,sessionID,date,time,numOfParticipents,contactNum,email,paymentMethod,amount} = req.body;

    let reservations;

    try{
        reservations = await Reservation.findByIdAndUpdate(id,
            {stdname,sessionID,date,time,numOfParticipents,contactNum,email,paymentMethod,amount});
            reservations = await reservations.save();
    }catch(err){
        console.log(err);
    }

    if(!reservations){
        return res.status(404).send({message:"unable to update reservation details"});
    }
    return res.status(200).json({reservations});

}






//delete session by id<<<
const deleteReservation = async (req, res, next) => {
    const id = req.params.id;

    let reservation;

    try{
        reservation = await Reservation.findByIdAndDelete(id);
    }catch(err){
        console.log(err);
    }
    if(!reservation){
        return res.status(404).send({message:"unable to delete reservation"});
    }
    return res.status(200).json({reservation});
}


// Get count of all reservations
const getReservationCount = async (req, res, next) => {
    let count;
    try {
        count = await Reservation.countDocuments();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
    return res.status(200).json({ count });
};



// Function to get the total revenue
const getTotalRevenue = async (req, res, next) => {
    try {
        // Get all reservations
        const reservations = await Reservation.find();
        
        // Calculate total revenue by summing up the amount field from each reservation
        const totalRevenue = reservations.reduce((acc, curr) => acc + curr.amount, 0);
        
        // Send the total revenue as a response
        return res.status(200).json({ totalRevenue });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};




// Function to get the sum of all numbers of participants
const getTotalParticipants = async (req, res, next) => {
    try {
        // Get all reservations
        const reservations = await Reservation.find();
        
        // Calculate total number of participants by summing up the numOfParticipents field from each reservation
        const totalParticipants = reservations.reduce((acc, curr) => acc + curr.numOfParticipents, 0);
        
        // Send the total number of participants as a response
        return res.status(200).json({ totalParticipants });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};





exports.getById = getById;
exports.addReservations = addReservations;
exports.getAllReservations = getAllReservations;
exports.updateReservation = updateReservation;
exports.deleteReservation = deleteReservation;
exports.getReservationCount = getReservationCount;
exports.getTotalRevenue = getTotalRevenue;
exports.getTotalParticipants = getTotalParticipants;

