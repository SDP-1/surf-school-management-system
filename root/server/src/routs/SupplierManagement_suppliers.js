const express = require("express");
const router = express.Router();
let Supplier = require("../models/SupplierManagement_Supplier");
const { ObjectId } = require("mongoose").Types;
const cors = require("cors");

// Apply CORS middleware at the router level
router.use(cors());
//creating routes according to your crud operations
//the reason you wont use get method is because it is less secured . data can be accesd when passing data to the database
router.route("/supplieradd").post((req,res)=>{
    const suppliercode= req.body.suppliercode;
    const suppliername= req.body.suppliername;
    const supplieremail= req.body.supplieremail;
    const suppliertype= req.body.suppliertype;
    const date= Date(req.body.date);
    const supplierphone= req.body.supplierphone;
    const equipment= req.body.equipment;
    const price = Number(req.body.price);
    const quantity = Number(req.body.quantity);
    const note = req.body.note;

    const newSupplier = new Supplier({
        suppliercode,
        suppliername,
        supplieremail,
        suppliertype,
        date,
        supplierphone,
        equipment,
        price,
        quantity,
        note
    });
     newSupplier.save().then(()=>{        //javascript promise
        res.json("Supplier added") 
     }).catch((err)=>{
        console.log(err);  //actually this an exception handling here
     });

});
//get details of the suppliers of the database
router.route("/allsupplier").get((req,res)=>{
    Supplier.find().then((suppliers)=>{
res.json(suppliers)
    }).catch((err)=>{
        console.log(err)
    })
})
//update
//first find the supplier that you want to update without affecting others
//when you use asynchronous performance gets higher 
router.route("/updatesupplier/:suppliercode").put(async (req, res) => {
    try {
        const supplierCode = req.params.suppliercode;
        const { suppliername, supplieremail, suppliertype, date, supplierphone, equipment, price, quantity, note } = req.body;

        // Construct the update object
        const updateSupplier = {
            suppliername,
            supplieremail,
            suppliertype,
            date,
            supplierphone,
            equipment,
            price,
            quantity,
            note
        };

        // Find and update the supplier using the model
        const updatedSupplier = await Supplier.findOneAndUpdate({ suppliercode: supplierCode }, updateSupplier);

        // Check if the supplier was found and updated
        if (updatedSupplier) {
            res.status(200).send({ status: "Supplier updated" });
        } else {
            res.status(404).send({ status: "Supplier not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error with updating data", error: err.message });
    }
});
//delete
router.route("/deletesupplier/:suppliercode").delete(async(req,res)=>{
    let suppliercode = req.params.suppliercode;
    await Supplier.findOneAndDelete({suppliercode:suppliercode}).then(()=>{
        res.status(200).send({status:"supplier deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with supplier deletion",error:err.message});
    }) 
   });
//find details of one user only
   router.route("/view/:suppliercode").get(async(req,res)=>{
       let sp =req.params.suppliercode;
       try {
        const sup = await Supplier.findOne({suppliercode: sp});
        res.status(200).send({ status: "Supplier fetched", sup });
      } catch (err) {
        console.log(err.message);
        res.status(500).send({
          status: "error with getting supplier",
          error: `An error occurred while fetching the supplier: ${err.message}`,
        });
      }
   });
   router.route("/count").get(async (req, res) => {
    try {
        // Get the count of all suppliers from the database
        const count = await Supplier.countDocuments();

        // Send the count as a response
        res.status(200).json({ count });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error getting supplier count" });
    }
});
module.exports = router;