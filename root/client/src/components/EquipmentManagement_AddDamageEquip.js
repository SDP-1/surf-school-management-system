import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AddDamageEquip() { 
    const [damageId, setDamage] = useState("");
    const [equipmentno, setItemCode] = useState("");
    const [equipmentname, setName] = useState("");
    const [damagedescription, setDiscription] = useState("");
    const [technicianname, setTechnicianName] = useState("");
    const [technicianemail, setTechnicianEmail] = useState("");
    const [assigneddate, setAssignedDate] = useState(new Date());
    const [deliverydate, setDeliveryDate] = useState(new Date());
    const [repaircost, setRepairCost] = useState("");

    function sendData(e) {
        e.preventDefault();
        if (!isValidTechnicianName(technicianname)) {
            alert('Technician name can only contain letters and spaces.');
            return;
        }

        const newequipment = {
            damageId,
            equipmentno,
            equipmentname,
            damagedescription,
            technicianname,
            technicianemail,
            assigneddate,
            deliverydate,
            repaircost
        };

        axios.post("http://localhost:4000/damageEquipment/add", newequipment)
        .then(() => {
            alert("Damage equipment added successfully");
            resetForm();
        }).catch((err) => {
            alert(err);
        });
    }

    // Function to reset form fields
    function resetForm() {
        setDamage("");
        setItemCode("");
        setName("");
        setDiscription("");
        setTechnicianName("");
        setTechnicianEmail("");
        setAssignedDate(new Date());
        setDeliveryDate(new Date());
        setRepairCost("");
    }

    // Function to validate technician name
    function isValidTechnicianName(name) {
        const regex = /^[a-zA-Z\s]*$/; 
        return regex.test(name);
    }

    return (
        <div className="container mt-5">
            <form className="mx-auto w-50 shadow p-5" onSubmit={sendData}>
                <Link className="btn btn-primary" to="/Equipment_Management/damage">Home</Link>
                <h3 className="mt-5">Fill-up details</h3>
                <div className="row">
                    <div className="col">
                        <div className="mb-3">
                            <label htmlFor="damageid" className="form-label">Damage Id</label>
                            <input type="text" className="form-control" id="damageid" placeholder="Enter Damage Id" name="damageid" value={damageId} onChange={(e) => { setDamage(e.target.value); }} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="equipmentno" className="form-label">Equipment NO</label>
                            <input type="text" className="form-control" id="equipmentno" placeholder="Enter Item Code" name="equipmentno" value={equipmentno} onChange={(e) => { setItemCode(e.target.value); }} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Equipment Name</label>
                            <input type="text" className="form-control" id="name" placeholder="Enter Item Name" name="itemname" value={equipmentname} onChange={(e) => { setName(e.target.value); }} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Damage Description</label>
                            <input type="text" className="form-control" id="description" placeholder="Enter Description" name="itemdescription" value={damagedescription} onChange={(e) => { setDiscription(e.target.value); }} required />
                        </div>
                    </div>
                    <div className="col">
                        <div className="mb-3">
                            <label htmlFor="technicianname" className="form-label">Technician Name</label>
                            <input type="text" className="form-control" id="technicianname" placeholder="Enter Technician Name" name="technicianname" value={technicianname} onChange={(e) => { setTechnicianName(e.target.value); }} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="technicianemail" className="form-label">Technician Email</label>
                            <input type="email" className="form-control" id="technicianemail" placeholder="Enter Technician Email" name="technicianemail" value={technicianemail} onChange={(e) => { setTechnicianEmail(e.target.value); }} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="assigneddate" className="form-label">Assigned Date</label>
                            <input type="date" className="form-control" id="assigneddate" placeholder="Enter assigned date" name="assigneddate" value={assigneddate} onChange={(e) => { setAssignedDate(e.target.value); }} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="deliverydate" className="form-label">Delivery Date</label>
                            <input type="date" className="form-control" id="deliverydate" placeholder="Enter delivery date" name="deliverydate" value={deliverydate} onChange={(e) => { setDeliveryDate(e.target.value); }} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="repaircost" className="form-label">Repair Cost</label>
                            <input type="text" className="form-control" id="repaircost" placeholder="Enter Repair Cost" name="repaircost" value={repaircost} onChange={(e) => { setRepairCost(e.target.value); }} required />
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Add</button>
            </form>
        </div>
    );
}
