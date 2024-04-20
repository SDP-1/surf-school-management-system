
const express = require("express");
const router = express.Router();

let DamageEquipment = require("../models/damageEquipment");
const cors = require("cors");

// Apply CORS middleware at the router level
router.use(cors());

//create variables in backend for frontend request body
//route for create
router.route("/add").post((req,res)=>{
    const damageId=req.body.damageId;
    const equipmentno=req.body.equipmentno;
    const equipmentname=req.body.equipmentname;
    const damagedescription=req.body.damagedescription;
    const technicianname=req.body.technicianname;
    const technicianemail=req.body.technicianemail;
    const assigneddate=new Date(req.body.assigneddate);
    const deliverydate=new Date(req.body.deliverydate);
    const repaircost=req.body.repaircost;


    const newDamageEquipment=new DamageEquipment({
        damageId,
        equipmentno,
        equipmentname,
        damagedescription,
        technicianname,
        technicianemail,
        assigneddate,
        deliverydate,
        repaircost
        
    })

    //exception handling
    newDamageEquipment.save().then(()=>{
        res.json("Damage Equipment Added")
    }).catch((err)=>{
        console.log(err);
    })

})

router.route("/count").get(async (req, res) => {
    try {
      const count = await DamageEquipment.countDocuments();
      res.json({ count });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    }
  });
//route for read
router.route("/damage").get((req,res)=>{
    DamageEquipment.find().then((damageEquipmentRt)=>{
        res.json(damageEquipmentRt)
    }).catch((err)=>{
        console.log(err)
    }) 
})


//route for update
router.route("/editDamageEquipment/:damageId").put(async(req,res)=>{
     //create a variable for store id
      let userId=req.params.id;
      const{ damageId,equipmentno, equipmentname,damagedescription,technicianname,technicianemail,assigneddate, deliverydate,repaircost}=req.body;//destructure

      //create a object for update
      const updateEquipment={
        damageId,
        equipmentno,
        equipmentname,
        damagedescription,
        technicianname,
        technicianemail,
        assigneddate,
        deliverydate,
        repaircost
      }
      try{
        //check the user
        const update=await DamageEquipment.findOneAndUpdate
        ({damageId:damageId},updateEquipment);
        if(update){
            res.status(200).send({status:"Damage Equipment updated"});
        }else{
            res.status(404).send({status:"Equipment not found"});
        }
        
        }catch(err){
          console.log(err);
          res.status(500).send({status:"Error with updating data", error: err.message});
        }     
    });
    


//delete
router.route("/deleteDamage/:damageId").delete(async(req,res)=>{
    let damageId=req.params.damageId;
    await DamageEquipment.findOneAndDelete({damageId:damageId}).then(()=>{
        res.status(200).send({status:"damage equipment deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with delete damage equipment",error:err.message});
    })
})




//get data from one studend
router.route("/viewd/:damageId").get(async(req,res)=>{
    let eq = req.params.damageId;
    try {
      const damage = await DamageEquipment.findOne({damageId: eq});
      res.status(200).send({ status: "equipment fetched", damage });
    } catch (err) {
      console.log(err.message);
      res.status(500).send({
        status: "error with get damage equipment",
        error: `An error occurred while fetching the damage equipment: ${err.message}`,
      });
    }
  });

module.exports=router;