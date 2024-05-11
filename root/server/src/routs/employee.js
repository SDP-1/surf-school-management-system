const router = require("express").Router();
let Employee = require("../models/Employee");

router.route("/add").post((req,res)=>{
    const eid = req.body.eid;
    const name = req.body.name;
    const age = Number(req.body.age);
    const address = req.body.address;
    const gender = req.body.gender;
    const email = req.body.email;
   
    const contactno = req.body.contactno;

    const newEmployee = new Employee({
        eid,
        name,
        age,
        address,
        gender,
        email,
        contactno
    })

    newEmployee.save().then(()=>{
        res.json("Employee Added")
    }).catch((err)=>{
        console.log(err);
    })
 
})

router.route("/").get((req,res)=>{

    Employee.find().then((employees)=>{
        res.json(employees)
    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/update/:eid").put(async(req,res) => {
   
   try{
    const empid = req.params.eid;
    const {eid, name,age,address,gender,email,contactno} = req.body;

    const updateEmployee = {
        eid,
        name,
        age,
        address,
        gender,
        email,
        contactno

    }
    const update = await Employee.findOneAndUpdate({eid:empid},updateEmployee);
    
    if(update){
        res.status(200).send({status:"User updated"})
    }
    else {
        console.log(err);
        res.status(500).send({status: "Error with updating data", error:err.message});
    }
}catch(err){
    console.log(err);
    res.status(500).send({status:"Error with updating data",error:err.message});
}
});

router.route("/delete/:eid").delete(async (req,res) => {
    const empid = req.params.eid;

    await Employee.findOneAndDelete({eid:empid})
    .then(() => {
        res.status(200).send({status: "User deleted"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with delete user",error: err.message});
    })
})

router.route("/get/:id").get(async(req,res) => {
    let userId = req.params.id;
    const user = await Employee.findById(userId)
    .then((Employee) => {
        res.status(200).send({status:"User fetched",Employee})
    }).catch(() => {
        console.log(err.message);
        res.status(500).send({status: "Error with get user",error: err.message});
    })
})


module.exports = router;