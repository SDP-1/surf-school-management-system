const Student = require("../models/student");

 const addStudent = async(req,res)=>{

    const name = req.body.name;
    const age = Number(req.body.age) ;  //convert string to number
    const gender = req.body.gender;

    const newStudent = new Student({
        name,
        age,
        gender
    });


    newStudent.save().then(()=>{
        res.json('Student added!');
    }).catch((err)=> {
        console.log(err);
    })
    
};


//htttp://localhost:5000/student
 const getStudents = async(req,res)=>{

    Student.find().then((students) => {
       res.json(students);    
    }).catch((err)=>{
        console.log(err);
    })  
};

 const getStudentById = async(req,res)=> {

    let userId = req.params.id;

    const user = await Student.findById(userId)
    .then((student) => {
           res.status(200).send({status : "User fetched",user : student})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status : "User not found",error : err.message});
    })
};


//htttp://localhost:5000/student/update/id
 const updateStudentById = async(req,res)=>{
    let userId = req.params.id;

    //destrcture method
    const {name,age,gender} = req.body;

    const updateStudent ={
        name,
        age,
        gender
    }

    const update = await Student.findByIdAndUpdate(userId,updateStudent).then(()=>{
        res.status(200).send({status : "User updated"});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status : "Error updating the User", error : err.message});
    })
    
}


//htttp://localhost:5000/student/update/id
 const deleteStudentById = async(req,res)=>{
    let userId = req.params.id;

    await Student.findByIdAndDelete(userId).then( (student)=>{
        res.status(200).send({status : "Deleted Successfully" , user : student}); 
    }).catch((err)=> {
        console.log(err); 
        res.status(500).send({status :"Error Deleting The User"});
        //500 - internal server error
    });
    
};


module.exports = {
    addStudent,
    getStudents,
    getStudentById,
    updateStudentById,
    deleteStudentById
};