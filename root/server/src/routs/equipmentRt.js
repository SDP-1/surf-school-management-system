const express = require("express");
const router = express.Router();
const Equipment = require("../models/equipment");
const cors = require("cors");
const { ObjectId } = require("mongoose").Types;




//route for create
router.post("/addEquipment", async (req, res) => {
  const {
    equipmentno,
    equipmentname,
    equipmentdescription,
    quantityinstock,
    quantityrequired,
    purchasetobemade,
    availableequipment,
    rentalequipment,
    damageequipment
  } = req.body;

  try {
    const newEquipment = new Equipment({
      equipmentno,
      equipmentname,
      equipmentdescription,
      quantityinstock,
      quantityrequired,
      purchasetobemade,
      availableequipment,
      rentalequipment,
      damageequipment
    });

    await newEquipment.save();

    res.json("Equipment Added");
  } catch (err) {
    if (err.name === "ValidationError") {
      const errors = {};
      Object.keys(err.errors).forEach((key) => {
        errors[key] = err.errors[key].message;
      });
      return res.status(400).json(errors);
    }
    console.error("Error adding equipment:", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});




//route for read
router.route("/").get((req,res)=>{
    Equipment.find().then((equipmentRt)=>{
        res.json(equipmentRt)
    }).catch((err)=>{
        console.log(err)
    }) 
})


//route for update
router.route("/editEquipment/:equipmentno").put(async(req,res)=>{
     //create a variable for store id
      let userId=req.params.id;
      const{equipmentno,equipmentname,equipmentdescription,quantityinstock,quantityrequired,purchasetobemade,availableequipment,rentalequipment,damageequipment}=req.body;//destructure

      //create a object for update
      const updateEquipment={
        equipmentno,
        equipmentname,
        equipmentdescription,
        quantityinstock,
        quantityrequired,
        purchasetobemade,
        availableequipment,
        rentalequipment,
        damageequipment
      }

 try{
    //check the user
    const update=await Equipment.findOneAndUpdate
    ({equipmentno:equipmentno},updateEquipment);
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

// DELETE: Delete equipment by equipmentno
router.delete('/delete/:equipmentno', async (req, res) => {
  const { equipmentno } = req.params;
  try {
    const deletedEquipment = await Equipment.findOneAndDelete({ equipmentno });
    if (!deletedEquipment) {
      return res.status(404).json({ message: 'Equipment not found' });
    }
    
    res.status(200).json({ message: 'Equipment deleted successfully', equipment: deletedEquipment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//total
router.get('/total', async (req, res) => {
  try {
    const totalQuantityInStock = await Equipment.aggregate([
      { $group: { _id: null, totalQuantityInStock: { $sum: "$quantityinstock" } } }
    ]);

    res.json({ totalQuantityInStock: totalQuantityInStock.length > 0 ? totalQuantityInStock[0].totalQuantityInStock : 0 });
  } catch (error) {
    console.error("Error calculating total quantity in stock:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
//get data from one studend
router.route("/viewEquipment/:equipmentno").get(async (req, res) => {
    let eq = req.params.equipmentno;
    try {
      const equipment = await Equipment.findOne({equipmentno: eq});
      res.status(200).send({ status: "equipment fetched", equipment });
    } catch (err) {
      console.log(err.message);
      res.status(500).send({
        status: "error with get equipment",
        error: `An error occurred while fetching the equipment: ${err.message}`,
      });
    }
  });

 
module.exports=router;