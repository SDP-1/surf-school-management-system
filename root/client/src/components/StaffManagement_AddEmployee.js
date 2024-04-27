import React, { useState } from "react";
import axios from 'axios';

export default function AddEmployee() {
    const [eid, setEid] = useState("");
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [contactno, setContact] = useState("");
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState({
        eid: "",
        age: "",
        contactno: "",
        email: ""
    });

    function validateInput(name, value) {
        switch (name) {
            case "eid":
                if (!/^[EARS]\d+$/.test(value.toUpperCase())) {
                    return "Invalid Employee ID. Please start with E, A, R, or S followed by digits.";
                }
                break;
            case "age":
                if (!/^\d+$/.test(value) || parseInt(value) <= 0) {
                    return "Invalid Age. Please enter a positive number.";
                }
                break;
            case "contactno":
                if (!/^\d{10}$/.test(value)) {
                    return "Invalid Phone Number. Please enter a 10-digit number.";
                }
                break;
            case "email":
                if (!value.includes('@')) {
                    return "Invalid Email Address. Please enter a valid email.";
                }
                break;
            default:
                break;
        }
        return "";
    }

    function handleBlur(e) {
        const { name, value } = e.target;
        const errorMessage = validateInput(name, value);
        setErrors({ ...errors, [name]: errorMessage });
    }

    function sendData(e) {
        e.preventDefault();

        // Validation part
        const formErrors = {};
        for (let field in { eid, age, contactno, email }) {
            const errorMessage = validateInput(field, eval(field));
            if (errorMessage) {
                formErrors[field] = errorMessage;
            }
        }
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        // If all validations pass, proceed with form submission
        const formData = new FormData();
        formData.append("eid", eid.toUpperCase());
        formData.append("name", name);
        formData.append("age", age);
        formData.append("address", address);
        formData.append("gender", gender);
        formData.append("email", email);
        formData.append("contactno", contactno);
        formData.append("image", image);

        axios.post("http://localhost:4000/employee/add", formData)
            .then(() => {
                alert("Employee added");
                window.location.href = "/staff/alle";
            }).catch((err) => {
                console.error("Failed to add employee:", err);
                setErrors({ ...errors, email: "Failed to add employee. Please try again later." });
            });
    }

    return (
        <div style={{ backgroundColor: "#0f2862", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <form onSubmit={sendData} className="mx-auto w-50 shadow p-5" style={{ border: "2px solid #091f36", backgroundColor: "#000000", color: "#ffffff" }}>
                <h3 className="mt-5">New Employee Adding Details</h3>
                {Object.values(errors).map((error, index) => error && <div key={index} className="alert alert-danger">{error}</div>)}
                <div className="mb-3">
                    <label htmlFor="employeeid" className="form-label">Employee ID</label>
                    <input type="text" className="form-control" id="employeeid" placeholder="Enter Employee ID"
                        name="eid" value={eid}
                        onChange={(e) => setEid(e.target.value)}
                        onBlur={handleBlur}
                        style={{ backgroundColor: "#0f2862", color: "#ffffff" }}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Employee Name</label>
                    <input type="text" className="form-control" id="name" placeholder="Enter Employee Name"
                        name="name" value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ backgroundColor: "#0f2862", color: "#ffffff" }}
                    />
                </div>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="age" className="form-label">Employee Age</label>
                        <input type="text" className="form-control" id="age" placeholder="Enter Age"
                            name="age" value={age}
                            onChange={(e) => setAge(e.target.value)}
                            onBlur={handleBlur}
                            style={{ backgroundColor: "#0f2862", color: "#ffffff" }}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Gender</label>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="gender" id="male" value="Male" onChange={(e) => setGender(e.target.value)} />
                            <label className="form-check-label" htmlFor="male">Male</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="gender" id="female" value="Female" onChange={(e) => setGender(e.target.value)} />
                            <label className="form-check-label" htmlFor="female">Female</label>
                        </div>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input type="text" className="form-control" id="address" placeholder="Enter Address"
                        name="address" value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        style={{ backgroundColor: "#0f2862", color: "#ffffff" }}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Employee Email</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter Email"
                        name="email" value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={handleBlur}
                        style={{ backgroundColor: "#0f2862", color: "#ffffff" }}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="contactno" className="form-label">Enter Contact no</label>
                    <input type="text" className="form-control" id="contactno" placeholder="Enter Contact no"
                        name="contactno" value={contactno}
                        onChange={(e) => setContact(e.target.value)}
                        onBlur={handleBlur}
                        style={{ backgroundColor: "#0f2862", color: "#ffffff" }}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Employee Image</label>
                    <input type="file" className="form-control" id="image" name="image" accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])} // Handle file selection
                        style={{ backgroundColor: "#0f2862", color: "#ffffff" }}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add</button>
            </form>
        </div>
    )
}
