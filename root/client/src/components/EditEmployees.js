import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function EditEmployees() {
    const { eid } = useParams();

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [contactno, setContactNo] = useState("");

  
    function sendData(e) {
        e.preventDefault();
        const editedEmployee = {
            eid,
            name,
            age,
            address,
            gender,
            email,
            contactno
        };
        axios.put(`http://localhost:8070/employee/update/${eid}`, editedEmployee)
        .then(() => {
            alert("Updated");
            window.location.href = "/";
        })
        .catch((err) => {
            alert(err.message);
        });
    }

    return (
        <div className="container">
            <h1>Edit Employee</h1>
            <form onSubmit={sendData}>

                <div className="mb-3">
                <label htmlFor="nameInput" className="form-label">
                    Eid
                    </label>
                    <input
                    type="text"
                    className="form-control"
                    id="idInput"
                    value={eid}
                    disabled
                    />

                </div>

                <div className="mb-3">
                    <label htmlFor="nameInput" className="form-label">
                        Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="nameInput"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="ageInput" className="form-label">
                        Age
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="ageInput"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="addressInput" className="form-label">
                        Address
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="addressInput"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="genderInput" className="form-label">
                        Gender
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="genderInput"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="emailInput" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="emailInput"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="contactNoInput" className="form-label">
                        Contact No
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="contactNoInput"
                        value={contactno}
                        onChange={(e) => setContactNo(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default EditEmployees;
