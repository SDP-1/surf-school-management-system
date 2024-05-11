
const express = require("express");
const router = express.Router();


const cors = require("cors");
const EquipmentReservation = require("../models/EquipmentManagement_equipReservation");


router.use(cors());


//route for create
router.route("/addReservation").post((req,res)=>{
    const reservationId=req.body.reservationId;
    const equipmentId=req.body.equipmentId;
    const renterId=req.body.renterId;
    const reservationDate=new Date(req.body.reservationDate);
    const returnDate=new Date(req.body.returnDate);
    const status=req.body.status;
   


    const newEquipmentReservation=new EquipmentReservation({
        reservationId,
        equipmentId,
        renterId,
        reservationDate,
        returnDate,
        status
        
    })

    //exception handling
    newEquipmentReservation.save().then(()=>{
        res.json(" Equipment  Reservation Added")
    }).catch((err)=>{
        console.log(err);
    })

})

//count reservations
router.route("/countR").get(async (req, res) => {
    try {
      const count = await EquipmentReservation.countDocuments();
      res.json({ count });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    }
  });
//route for read
router.route("/allReservation").get((req,res)=>{
    EquipmentReservation.find().then((equipmentReservationRt)=>{
        res.json(equipmentReservationRt)
    }).catch((err)=>{
        console.log(err)
    }) 
})


//route for update
router.route("/editEquipmentReservation/:reservationId").put(async(req,res)=>{
     
      let userId=req.params.id;
      const{reservationId,equipmentId,renterId,reservationDate,returnDate,status}=req.body;//destructure

      
      const updateReservation={
       reservationId,
       equipmentId,
       renterId,
       reservationDate,
       returnDate,
       status
      }
      try{
        
        const update=await EquipmentReservation.findOneAndUpdate
        ({reservationId:reservationId},updateReservation);
        if(update){
            res.status(200).send({status:"Equipment Reservation updated"});
        }else{
            res.status(404).send({status:"Equipment Reservation not found"});
        }
        
        }catch(err){
          console.log(err);
          res.status(500).send({status:"Error with updating data", error: err.message});
        }     
    });
    


//delete
router.route("/cancelReservation/:reservationId").delete(async(req,res)=>{
    let reservationId=req.params.reservationId;
    await EquipmentReservation.findOneAndDelete({reservationId:reservationId}).then(()=>{
        res.status(200).send({status:"Equipment reservation Cancelled"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with delete equipment reservation",error:err.message});
    })
})




//get data from one studend
router.route("/view/:reservationId").get(async(req,res)=>{
    let eq=req.params.reservationId;

    try {
        const reservation = await EquipmentReservation.findOne({reservationId:eq});
        res.status(200).send({ status: "reservation fetched", reservation });
      } catch (err) {
        console.error(err.stack);
        res.status(500).send({
          status: "error with get reservation",
          error: `An error occurred while fetching the reservation: ${err.message}`,
        });
      }
});
module.exports=router;