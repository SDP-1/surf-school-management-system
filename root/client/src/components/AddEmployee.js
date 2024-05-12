import React, { useState } from "react";
import axios from "axios";

export default function AddEmployee() {
  const [eid, setEid] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setgender] = useState("");
  const [email, setEmail] = useState("");
  const [contactno, setContact] = useState("");

  function sendData(e) {
    e.preventDefault();
    alert("Insert");

    const newEmployee = {
      eid,
      name,
      age,
      address,
      gender,
      email,
      contactno,
    };
    console.log(newEmployee);

    axios
      .post("http://localhost:8070/employee/add", newEmployee)
      .then(() => {
        alert("Employee added");
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div className="container mt-5">
      <form onSubmit={sendData} className="mx-auto w-50 shadow p-5">
        <h3 className="mt-5">New Employee Adding Details</h3>
        <div className="mb-3">
          <label htmlFor="employeeid" className="form-label">
            Employee ID
          </label>
          <input
            type="text"
            className="form-control"
            id="employeeid"
            placeholder="Enter Employee ID"
            name="employeeid"
            onChange={(e) => setEid(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Employee Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter Employee Name"
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">
            Employee Age
          </label>
          <input
            type="text"
            className="form-control"
            id="age"
            placeholder="Enter Age"
            name="age"
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            placeholder="Enter Address"
            name="address"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="gender" className="form-label">
            Gender
          </label>
          <input
            type="text"
            className="form-control"
            id="gender"
            placeholder="Enter gender"
            name="gender"
            onChange={(e) => setgender(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Employee Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter Email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="contactno" className="form-label">
            Enter Contact no
          </label>
          <input
            type="text"
            className="form-control"
            id="contactno"
            placeholder="Enter Contact no"
            name="contactno"
            onChange={(e) => setContact(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
    </div>
  );
}
