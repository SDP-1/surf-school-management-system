import React, { useState } from "react";
import axios from 'axios';

export default function Staff_WorkSheetAdd() {
    const [Eid, setEid] = useState("");
    const [Ename, setEname] = useState("");
    const [Role, setRole] = useState("");
    const [Monday, setMonday] = useState("");
    const [Tuesday, setTuesday] = useState("");
    const [Wednesday, setWednesday] = useState("");
    const [Thursday, setThursday] = useState("");
    const [Friday, setFriday] = useState("");
    const [Saturday, setSaturday] = useState("");
    const [Sunday, setSunday] = useState("");

    function assignRole(employeeId) {
        const firstChar = employeeId.charAt(0).toUpperCase();
        switch (firstChar) {
            case 'A':
                setRole("Admin");
                break;
            case 'R':
                setRole("Receptionist");
                break;
            case 'E':
                setRole("Worker");
                break;
            case 'S':
                setRole("Surf Trainer");
                break;
            default:
                setRole("");
                break;
        }
    }

    function handleEidChange(e) {
        setEid(e.target.value);
        assignRole(e.target.value);
    }

    function sendData(e) {
        e.preventDefault();

        const newWorksheet = {
            Eid,
            Ename,
            Role,
            Monday,
            Tuesday,
            Wednesday,
            Thursday,
            Friday,
            Saturday,
            Sunday
        };

        axios.post("http://localhost:4000/worksheet/addw", newWorksheet)
            .then(() => {
                alert("Staff Worksheet added successfully");
            }).catch((err) => {
                alert("Error adding Staff Worksheet: " + err);
            });
    }

    return (
        <div className="container-fluid bg-dark text-light p-5">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <form onSubmit={sendData} className="p-4 border border-light rounded">
                        <h2 className="mb-4">Staff Worksheet</h2>
                        <div className="mb-3">
                            <label htmlFor="Eid" className="form-label">Employee ID:</label>
                            <input type="text" className="form-control" id="Eid" value={Eid} onChange={handleEidChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Name" className="form-label">Name:</label>
                            <input type="text" className="form-control" id="Name" value={Ename} onChange={(e) => setEname(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Role" className="form-label">Role:</label>
                            <input type="text" className="form-control" id="Role" value={Role} readOnly />
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="Monday" className="form-label">Monday:</label>
                                <select className="form-select" id="Monday" value={Monday} onChange={(e) => setMonday(e.target.value)}>
                                    <option value="">Select Shift</option>
                                    <option value="7-12 Morning">7-12 Morning</option>
                                    <option value="12-6 Evening">12-6 Evening</option>
                                    <option value="Day">Day</option>
                                    <option value="Night">Night</option>
                                    <option value="Full Day">Full Day</option>
                                    <option value="Off Day">Off Day</option>
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="Tuesday" className="form-label">Tuesday:</label>
                                <select className="form-select" id="Tuesday" value={Tuesday} onChange={(e) => setTuesday(e.target.value)}>
                                    <option value="">Select Shift</option>
                                    <option value="7-12 Morning">7-12 Morning</option>
                                    <option value="12-6 Evening">12-6 Evening</option>
                                    <option value="Day">Day</option>
                                    <option value="Night">Night</option>
                                    <option value="Full Day">Full Day</option>
                                    <option value="Off Day">Off Day</option>
                                </select>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="Wednesday" className="form-label">Wednesday:</label>
                                <select className="form-select" id="Wednesday" value={Wednesday} onChange={(e) => setWednesday(e.target.value)}>
                                    <option value="">Select Shift</option>
                                    <option value="7-12 Morning">7-12 Morning</option>
                                    <option value="12-6 Evening">12-6 Evening</option>
                                    <option value="Day">Day</option>
                                    <option value="Night">Night</option>
                                    <option value="Full Day">Full Day</option>
                                    <option value="Off Day">Off Day</option>
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="Thursday" className="form-label">Thursday:</label>
                                <select className="form-select" id="Thursday" value={Thursday} onChange={(e) => setThursday(e.target.value)}>
                                    <option value="">Select Shift</option>
                                    <option value="7-12 Morning">7-12 Morning</option>
                                    <option value="12-6 Evening">12-6 Evening</option>
                                    <option value="Day">Day</option>
                                    <option value="Night">Night</option>
                                    <option value="Full Day">Full Day</option>
                                    <option value="Off Day">Off Day</option>
                                </select>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="Friday" className="form-label">Friday:</label>
                                <select className="form-select" id="Friday" value={Friday} onChange={(e) => setFriday(e.target.value)}>
                                    <option value="">Select Shift</option>
                                    <option value="7-12 Morning">7-12 Morning</option>
                                    <option value="12-6 Evening">12-6 Evening</option>
                                    <option value="Day">Day</option>
                                    <option value="Night">Night</option>
                                    <option value="Full Day">Full Day</option>
                                    <option value="Off Day">Off Day</option>
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="Saturday" className="form-label">Saturday:</label>
                                <select className="form-select" id="Saturday" value={Saturday} onChange={(e) => setSaturday(e.target.value)}>
                                    <option value="">Select Shift</option>
                                    <option value="7-12 Morning">7-12 Morning</option>
                                    <option value="12-6 Evening">12-6 Evening</option>
                                    <option value="Day">Day</option>
                                    <option value="Night">Night</option>
                                    <option value="Full Day">Full Day</option>
                                    <option value="Off Day">Off Day</option>
                                </select>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="Sunday" className="form-label">Sunday:</label>
                                <select className="form-select" id="Sunday" value={Sunday} onChange={(e) => setSunday(e.target.value)}>
                                    <option value="">Select Shift</option>
                                    <option value="7-12 Morning">7-12 Morning</option>
                                    <option value="12-6 Evening">12-6 Evening</option>
                                    <option value="Day">Day</option>
                                    <option value="Night">Night</option>
                                    <option value="Full Day">Full Day</option>
                                    <option value="Off Day">Off Day</option>
                                </select>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
