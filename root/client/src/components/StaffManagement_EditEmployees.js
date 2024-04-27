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
    const [image, setImage] = useState(null);

    useEffect(() => {
        async function getEmployeeDetails() {
            try {
                const response = await axios.get(`http://localhost:4000/employee/get/${eid}`);
                const { employee } = response.data;
                setName(employee.name);
                setAge(employee.age);
                setAddress(employee.address);
                setGender(employee.gender);
                setEmail(employee.email);
                setContactNo(employee.contactno);
            } catch (error) {
                alert(error.message);
            }
        }
        getEmployeeDetails();
    }, [eid]);

    function sendData(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("age", age);
        formData.append("address", address);
        formData.append("gender", gender);
        formData.append("email", email);
        formData.append("contactno", contactno);
        if (image) {
            formData.append("image", image);
        }

        axios.put(`http://localhost:4000/employee/update/${eid}`, formData)
        .then(() => {
            alert("Updated");
            window.location.href = "/staff/alle";
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
                <div className="mb-3">
                    <label htmlFor="imageInput" className="form-label">
                        Employee Image
                    </label>
                    <input
                        type="file"
                        className="form-control"
                        id="imageInput"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default EditEmployees;
