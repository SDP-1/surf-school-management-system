
const express = require("express");
const router = express.Router();

let DamageEquipment = require("../equipment/damageEquipment");
const cors = require("cors");

// Apply CORS middleware at the router level
router.use(cors());

//create variables in backend for frontend request body
//route for create
router.route("/add").post((req,res)=>{
    const itemno=req.body.itemno;
    const itemname=req.body.itemname;
    const damagediscription=req.body.damagediscription;
    const technicianname=req.body.technicianname;
    const technicianemail=req.body.technicianemail;
    const assigneddate=Date(req.body.assigneddate);
    const deliverydate=Date(req.body.deliverydate);
    const repaircost=req.body.repaircost;


    const newDamageEquipment=new DamageEquipment({
        itemno,
        itemname,
        damagediscription,
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


//route for read
router.route("/").get((req,res)=>{
    Equipment.find().then((damageEquipmentRt)=>{
        res.json(damageEquipmentRt)
    }).catch((err)=>{
        console.log(err)
    }) 
})


//route for update
router.route("/edit/:id").put(async(req,res)=>{
     //create a variable for store id
      let userId=req.params.id;
      const{ itemno, itemname,damagediscription,technicianname,technicianemail,assigneddate, deliverydate,repaircost}=req.body;//destructure

      //create a object for update
      const updateEquipment={
        itemno,
        itemname,
        damagediscription,
        technicianname,
        technicianemail,
        assigneddate,
        deliverydate,
        repaircost
      }
      //check the user
      const update=await DamageEquipment.findByIdAndUpdate(userId,updateEquipment)
      .then(()=>{  
      //response to frontend
      res.status(200).send({status:"Damage Equipment updated"})
      }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data", error: err.message});
      })
})


//delete
router.route("/delete/:id").delete(async(req,res)=>{
    let userId=req.params.id;
    await DamageEquipment.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status:"equipment deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with delete equipment",error:err.message});
    })
})


//get data from one studend
router.route("/view/:id").get(async(req,res)=>{
    let userId=req.params.id;
    const user=await DamageEquipment.findById(userId).then((equipment)=>{
        res.status(200).send({status:"equipment fetched",equipment});
    }).catch(()=>{
        console.log(err.message);
        res.status(500).send({status:"error with get equipment",error:err.message});
    })
})

module.exports=router;