const express = require("express");
const router = express.Router();


//Insert Model
const Reservation = require("../models/ReservationModel");

//Insert  Controller
const ReservationController = require("../controller/ReservationControllers");

router.get("/",ReservationController.getAllReservations);
router.post("/",ReservationController.addReservations);
router.get("/count", ReservationController.getReservationCount);   // route for getting the count of all reservations
router.get("/total-revenue", ReservationController.getTotalRevenue);    // Route to get the total revenue
router.get("/total-students", ReservationController.getTotalParticipants);   // Route to get the total participants
router.get("/:id",ReservationController.getById);
router.put("/:id",ReservationController.updateReservation);
router.delete("/:id",ReservationController.deleteReservation);








//export
module.exports = router;