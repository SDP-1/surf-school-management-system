import React, { useState } from "react";
import axios from "axios";

function AddStudent(){

    const [name,setName] = useState("");
    const [age,setAge] = useState("");
    const [gender,setGender] = useState("");

    function sendData(e){
        e.preventDefault();
        
        const newStudent={
            name,
            age,
            gender
        }

        axios.post("http://localhost:5000/student/add",newStudent)
             .then(()=>{
                 alert('Student Added');
                 resetForm();
             }).catch((err)=>{
                console.log(err);
             })
        
    }

    function resetForm() {
        setName("");
        setAge("");
        setGender("");
        document.getElementById("name").value = "";
        document.getElementById("age").value = "";
        document.getElementById("gender").value = "";
    }



    return(

            <div className="container">
        <form onSubmit={sendData}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Student Name</label>
                <input type="text" className="form-control" id="name" placeholder="Enter Student Name" onChange={(e)=>{
                    setName(e.target.value)
                }} />
            </div>

            <div className="mb-3">
                <label htmlFor="age" className="form-label">Age</label>
                <input type="number" className="form-control" id="age" placeholder="Enter Student Age" onChange={(e)=>{
                    setAge(e.target.value)
                }}/>
            </div>

            <div className="mb-3">
                <label htmlFor="gender" className="form-label">Gender</label>
                <input type="text" className="form-control" id="gender" placeholder="Enter Student Gender" onChange={(e)=>{
                    setGender(e.target.value)
                }}/>
            </div>
            
            <ul className="list-group">
                <li className="list-group-item">Name: {name}</li>
                <li className="list-group-item">Age: {age}</li>
                <li className="list-group-item">Gender: {gender}</li>
            </ul>
            
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
    )
}

export default AddStudent;