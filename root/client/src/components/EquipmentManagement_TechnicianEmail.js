import React, { useState } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";

const TechnicianEmail = () => {
  const [msg,setMsg] = useState('');
  const [user, setUser] = useState({
    to: "",
    subject: "",
    description: ""
  });

  const { to, subject, description} = user; 
  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:4000/technicianEmail/t`, user);
      setMsg(response.data.respMesg);
      setUser({
        to: "",
        subject: "",
        description: ""
      });
    } catch (error) {
      console.error(error);
      setMsg('Error sending email');
    }
  };
  return (
    <div className="container mt-5">
       <form className="mx-auto w-50 shadow p-5" >
       <Link className="btn btn-primary" to="Equipment_Management/damage">Home</Link>
         <h3 className="text-center text-success mb-2 mt-4">Assign the technician </h3>
         <h6 className="text-secondary text-center mb-4 mt-1">contact the technician</h6>
      <div className="row">  
     
       <div className="col-sm-8 mx-auto shadow p-5">
        <h4 className="text-center mb-2">Send E-Mail </h4>
           <p className="mb-3 mt-2" style={{color:"green",marginLeft:"57px"}}><b>{msg}</b></p>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="To"
              name="to"
              onChange={onInputChange}
              value={user.to}
            />
          </div>
          <div className="form-group  mb-4 ">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Subject"
              name="subject"
              onChange={onInputChange}
              value={subject}
            />
          </div>
          <div className="form-group  mb-4">
            <textarea
              type="text"
              className="form-control form-control-lg"
              placeholder="Description"
              name="description"
              onChange={onInputChange}
              value={description}
            />
          </div>
         
          <button onClick={onSubmit} className="btn btn-primary btn-block " style={{marginLeft:"100px"}}>Send Mail</button>
      
      </div>
    </div>
    </form>
  </div>  
  );
};

export default TechnicianEmail;