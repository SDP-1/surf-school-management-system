import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios, { Axios } from "axios";


export default function AddEquipment() { 
    
    const [itemno, setItemCode] = useState("");
    const [itemname, setName] = useState("");
    const [damagediscription, setDiscription] = useState("");
    const [technicianname, setTechnicianName] = useState("");
    const [technicianemail, setTechnicianEmail] = useState("");
    const [assigneddate, setAssignedDate] = useState("");
    const [deliverydate, setDeliveryDate] = useState("");
    const[repaircost,setRepairCost]=useState("");
    
   
    function sendData(e){
        e.preventDefault();
        const newequipment={itemno,itemname,damagediscription,technicianname,technicianemail,assigneddate,deliverydate,repaircost}
        
        axios.post("http://localhost:8070/damageEquipment/add",newequipment)
        .then(()=>{
            alert("damage equipment Added")
            setItemCode("");
            setName("");
            setDiscription("");
            setTechnicianName("");
            setTechnicianEmail("");
            setAssignedDate("");
            setDeliveryDate("");
            setRepairCost("");
           
        }).catch((err)=>{
            alert(err)
        })
    }
    
   
   

    return (
        <div className="container mt-5">
            <form className="mx-auto w-50 shadow p-5" onSubmit={sendData}>
                <Link className="btn btn-primary" to="/">Home</Link>
                <h3 className="mt-5">Fill-up details</h3>
                <div className="mb-3">
                    <label htmlFor="itemcode" className="form-label">Item code</label>
                    <input type="text" className="form-control" id="itemcode" placeholder="Enter Item Code" name="itemno" value={itemno} onChange={(e) => {setItemCode(e.target.value);}} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Item Name</label>
                    <input type="text" className="form-control" id="name" placeholder="Enter Item Name" name="itemname" value={itemname} onChange={(e) => {setName(e.target.value);}} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="discription" className="form-label">Damage Discription</label>
                    <input type="text" className="form-control" id="discription" placeholder="Enter Description" name="itemdiscription" value={damagediscription} onChange={(e) => {setDiscription(e.target.value);}} required />
                </div>
                
                <div className="mb-3">
                    <label htmlFor="quantity_required" className="form-label">Technician Name</label>
                    <input type="text" className="form-control" id="quantity_required" placeholder="Enter Quantity Required" name="quantityrequired" value={technicianname} onChange={(e) => {setTechnicianName(e.target.value);}}  required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="purchase_to_be_made" className="form-label">Technician Email</label>
                    <input type="text" className="form-control" id="purchase_to_be_made" placeholder="Enter Purchase To Be Made" name="purchasetobemade" value={technicianemail} onChange={(e) => {setTechnicianEmail(e.target.value);}} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="available" className="form-label">Assigned Date</label>
                    <input type="text" className="form-control" id="available" placeholder="Enter Available Items" name="availableitems" value={assigneddate} onChange={(e) => {setAssignedDate(e.target.value);}} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="damage" className="form-label">Delivery Date</label>
                    <input type="text" className="form-control" id="rental" placeholder="Enter rental Items" name="rentalitems" value={deliverydate} onChange={(e) => { setDeliveryDate(e.target.value);}} required/>
                </div>
               
                <div className="mb-3">
                    <label htmlFor="damage" className="form-label">Repair Cost</label>
                    <input type="text" className="form-control" id="damage" placeholder="Enter Damage Items" name="damageitems" value={repaircost} onChange={(e) => {setRepairCost(e.target.value);}} required />
                </div>
                <button type="submit" className="btn btn-primary">Add</button>
            </form>
        </div>
    )
}
