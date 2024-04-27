import React, { useState } from "react";

import axios from "axios";
import { Link } from "react-router-dom";


export default function AddDamageEquip() { 
    const [damageId, setDamage] = useState("");
    const [equipmentno, setItemCode] = useState("");
    const [equipmentname, setName] = useState("");
    const [damagediscription, setDiscription] = useState("");
    const [suppliername, setSupplierName] = useState("");
    const [supplieremail, setSupplierEmail] = useState("");
    const [technicianname, setTechnicianName] = useState("");
    const [technicianemail, setTechnicianEmail] = useState("");
    const [assigneddate, setAssignedDate] = useState(new Date());
    const [deliverydate, setDeliveryDate] = useState(new Date());
    const[repaircost,setRepairCost]=useState("");
    
   
    function sendData(e){
        e.preventDefault();
        const newequipment={damageId,equipmentno,equipmentname,damagediscription,suppliername,supplieremail,technicianname,technicianemail,assigneddate,deliverydate,repaircost}
        
        axios.post("http://localhost:4000/damageEquipment/add",newequipment)
        .then(()=>{
            alert("damage equipment Added")
            setDamage("");
            setItemCode("");
            setName("");
            setDiscription("");
            setSupplierName("");
            setSupplierEmail("");
            setTechnicianName("");
            setTechnicianEmail("");
            setAssignedDate(new Date());
            setDeliveryDate(new Date());
            setRepairCost("");
           
        }).catch((err)=>{
            alert(err)
        })
    }
    
   
   

    return (
        <div className="container mt-5">
            <form className="mx-auto w-50 shadow p-5" onSubmit={sendData}>
                <Link className="btn btn-primary" to="/damage">Home</Link>
                <h3 className="mt-5">Fill-up details</h3>
                <div className="row">
                <div className="col">
                <div className="mb-3">
                    <label htmlFor="itemcode" className="form-label">Damage Id</label>
                    <input type="text" className="form-control" id="damageid" placeholder="Enter Damage Id" name="damageid" value={damageId} onChange={(e) => {setDamage(e.target.value);}} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="itemcode" className="form-label">Equipment NO</label>
                    <input type="text" className="form-control" id="equipmentno" placeholder="Enter Item Code" name="equipmentno" value={equipmentno} onChange={(e) => {setItemCode(e.target.value);}} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Equipment Name</label>
                    <input type="text" className="form-control" id="name" placeholder="Enter Item Name" name="itemname" value={equipmentname} onChange={(e) => {setName(e.target.value);}} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="discription" className="form-label">Damage Discription</label>
                    <input type="text" className="form-control" id="discription" placeholder="Enter Description" name="itemdiscription" value={damagediscription} onChange={(e) => {setDiscription(e.target.value);}} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="quantity_required" className="form-label">Supplier Name</label>
                    <input type="text" className="form-control" id="quantity_required" placeholder="Enter Quantity Required" name="quantityrequired" value={suppliername} onChange={(e) => {setSupplierName(e.target.value);}}  required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="purchase_to_be_made" className="form-label">Supplier Email</label>
                    <input type="text" className="form-control" id="purchase_to_be_made" placeholder="Enter Purchase To Be Made" name="purchasetobemade" value={supplieremail} onChange={(e) => {setSupplierEmail(e.target.value);}} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="quantity_required" className="form-label">Technician Name</label>
                    <input type="text" className="form-control" id="quantity_required" placeholder="Enter Quantity Required" name="quantityrequired" value={technicianname} onChange={(e) => {setTechnicianName(e.target.value);}}  required/>
                </div>
                </div>
                <div className="col">
                <div className="mb-3">
                    <label htmlFor="purchase_to_be_made" className="form-label">Technician Email</label>
                    <input type="text" className="form-control" id="purchase_to_be_made" placeholder="Enter Purchase To Be Made" name="purchasetobemade" value={technicianemail} onChange={(e) => {setTechnicianEmail(e.target.value);}} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="assigneddate" className="form-label">Assigned Date</label>
                    <input type="date" className="form-control" id="assigneddate" placeholder="Enter assigned date" name="assigneddate" value={assigneddate} onChange={(e) => {setAssignedDate(e.target.value);}} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="deliverydate" className="form-label">Delivery Date</label>
                    <input type="date" className="form-control" id="deliverydate" placeholder="Enter delivery date" name="deliverydate" value={deliverydate} onChange={(e) => { setDeliveryDate(e.target.value);}} required/>
                </div>
               
                <div className="mb-3">
                    <label htmlFor="repaircost" className="form-label">Repair Cost</label>
                    <input type="text" className="form-control" id="damage" placeholder="Enter Damage Items" name="damageitems" value={repaircost} onChange={(e) => {setRepairCost(e.target.value);}} required />
                </div>
                </div>
                </div>
                <button type="submit" className="btn btn-primary">Add</button>
            </form>
        </div>
    )
}
