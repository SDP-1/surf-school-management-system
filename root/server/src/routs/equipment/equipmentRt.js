const express = require("express");
const router = express.Router();
const Equipment = require("");
const cors = require("cors");

// Apply CORS middleware at the router level
router.use(cors());

//create variables in backend for frontend request body
//route for create
router.route("/addEquipment").post((req,res)=>{
    const itemno=req.body.itemno;
    const itemname=req.body.itemname;
    const itemdiscription=req.body.itemdiscription;
    const quantityinstock=(req.body.quantityinstock);
    const quantityrequired=(req.body.quantityrequired);
    const purchasetobemade=(req.body.purchasetobemade);
    const availableitems=(req.body.availableitems);
    const rentalitems=(req.body.rentalitems);
    const damageitems=(req.body.damageitems);
    


    const newEquipment = new Equipment({
        itemno,
        itemname,
        itemdiscription,
        quantityinstock,
        quantityrequired,
        purchasetobemade,
        availableitems,
        rentalitems,
        damageitems
      });

    //exception handling
    newEquipment.save().then(()=>{
        res.json("Equipment Added")
    }).catch((err)=>{
        if (err.name === "ValidationError") {
            const errors = {};
            Object.keys(err.errors).forEach((key) => {
              errors[key] = err.errors[key].message;
            });
            return res.status(400).json(errors);
          }
          return res.status(500).json({ error: "Something went wrong" });
    });

})


//route for read
router.route("/").get((req,res)=>{
    Equipment.find().then((equipmentRt)=>{
        res.json(equipmentRt)
    }).catch((err)=>{
        console.log(err)
    }) 
})


//route for update
router.route("/editEquipment/:id").put(async(req,res)=>{
     //create a variable for store id
      let userId=req.params.id;
      const{itemno,itemname,itemdiscription,quantityinstock,quantityrequired,purchasetobemade,availableitems,rentalitems,damageitems}=req.body;//destructure

      //create a object for update
      const updateEquipment={
        itemno,
        itemname,
        itemdiscription,
        quantityinstock,
        quantityrequired,
        purchasetobemade,
        availableitems,
        rentalitems,
        damageitems
      }

 try{
    //check the user
    const update=await Equipment.findOneAndUpdate
    ({itemno:itemno},updateEquipment);
    if(update){
        res.status(200).send({status:"Equipment updated"});
    }else{
        res.status(404).send({status:"Equipment not found"});
    }
    
    }catch(err){
      console.log(err);
      res.status(500).send({status:"Error with updating data", error: err.message});
    }     
});


//delete
router.route("/delete/:itemno").delete(async(req,res)=>{
    const itemno=req.params.itemno;
    await Equipment.findOneAndDelete({itemno:itemno}).then(()=>{
        res.status(200).send({status:"equipment deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with delete equipment",error:err.message});
    })
})


//get data from one studend
router.route("/viewEquipment/:id").get(async(req,res)=>{
    let userId=req.params.id;
    const user=await Equipment.findById(userId).then((equipment)=>{
        res.status(200).send({status:"equipment fetched",equipment});
    }).catch(()=>{
        console.log(err.message);
        res.status(500).send({status:"error with get equipment",error:err.message});
    })
})

module.exports=router;