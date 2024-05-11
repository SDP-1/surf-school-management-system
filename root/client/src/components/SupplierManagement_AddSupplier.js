import React, { useState } from "react";

import axios from "axios";
import { Link } from "react-router-dom";

export default function AddSupplier(){
  const [suppliercode,setCode] = useState("");
  const [suppliername,setName] = useState("");
  const [supplieremail,setEmail] = useState("");
  const [suppliertype,setType] = useState("");
  const [date,setDate] = useState(new Date());
  const [supplierphone,setPhone] = useState("");
  const [equipment,setEquipment] = useState("");
  const [price,setPrice] = useState(0);
  const [quantity,setQuantity] = useState(0);
  const [note,setNote] = useState("");
  const [error, setError] = useState("");

  function validateEmail(email) {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
}

function validatePhone(phone) {
    const regex = /^[0-9]{10}$/;
    return regex.test(phone);
}

  function sendData(e){
    e.preventDefault();

    if (!validateEmail(supplieremail)) {
        setError("Invalid email address");
        return;
    }

    if (!validatePhone(supplierphone)) {
        setError("Invalid phone number (10 digits only)");
        return;
    }
    const newSupplier ={
      suppliercode,
      suppliername,
      supplieremail,
      suppliertype,
      date,
      supplierphone,
      equipment,
      price,
      quantity,
      note

    }
    axios.post("http://localhost:4000/supplier/supplieradd",newSupplier).then(()=> {
      alert("Supplier added")
      setCode("");
      setName("");
      setEmail("");
      setType("");
      setDate("");
      setPhone("");
      setEquipment("");
      setPrice("");
      setQuantity("");
      setNote("");
      setError("");
    }).catch((err)=>{
      alert(err);
    });
  }
  return(
    <div className="container mt-5">
            <form className="mx-auto w-50 shadow p-5" onSubmit={sendData}>
                <Link className="btn btn-primary" to="/supplier/allsup">Home</Link>
                <h3 className="mt-5">Fill-up details</h3>
                <div className="row">
                <div className="col">
                <div className="mb-3">
                    <label htmlFor="suppliercode" className="form-label">Supplier Code</label>
                    <input type="text" className="form-control" id="suppliercode" placeholder="Enter Supplier code" name="suppliercode" value={suppliercode} onChange={(e) => {setCode(e.target.value);}} required />
                </div>
                <div className="mb-3">
                            <label htmlFor="suppliername" className="form-label">Supplier Name</label>
                            <input type="text" className="form-control" id="suppliername" placeholder="Enter Supplier name" name="suppliername" value={suppliername} onChange={(e) => { setName(e.target.value); }} required />
                </div>
                <div className="mb-3">
                            <label htmlFor="supplieremail" className="form-label">Supplier Email</label>
                            <input type="email" className="form-control" id="supplieremail" placeholder="Enter Supplier email" name="supplieremail" value={supplieremail} onChange={(e) => { setEmail(e.target.value); }} required />
                </div>
                <div className="mb-3">
                            <label htmlFor="suppliertype" className="form-label">Supplier Type</label>
                            <input type="text" className="form-control" id="suppliertype" placeholder="Enter Supplier type" name="suppliertype" value={suppliertype} onChange={(e) => { setType(e.target.value); }} required />
                </div>
                
                <div className="mb-3">
                            <label htmlFor="date" className="form-label">Date</label>
                            <input type="date" className="form-control" id="date" name="date" value={date} onChange={(e) => { setDate(e.target.value); }} required />
                </div>
                </div>
                <div className="col">
                <div className="mb-3">
                            <label htmlFor="supplierphone" className="form-label">Supplier Phone</label>
                            <input type="tel" className="form-control" id="supplierphone" placeholder="Enter Supplier phone" name="supplierphone" value={supplierphone} onChange={(e) => { setPhone(e.target.value); }} required />
                </div>
                <div className="mb-3">
                            <label htmlFor="equipment" className="form-label">Equipment</label>
                            <input type="text" className="form-control" id="equipment" placeholder="Enter Equipment" name="equipment" value={equipment} onChange={(e) => { setEquipment(e.target.value); }} required />
                </div>
                <div className="mb-3">
                            <label htmlFor="price" className="form-label">Price</label>
                            <input type="number" className="form-control" id="price" placeholder="Enter Price" name="price" value={price} onChange={(e) => { setPrice(e.target.value); }} required />
                </div>
               
                <div className="mb-3">
                            <label htmlFor="quantity" className="form-label">Quantity</label>
                            <input type="number" className="form-control" id="quantity" placeholder="Enter Quantity" name="quantity" value={quantity} onChange={(e) => { setQuantity(e.target.value); }} required />
                </div>
                <div className="mb-3">
                            <label htmlFor="note" className="form-label">Note</label>
                            <input type="text" className="form-control" id="note" placeholder="Enter Note" name="note" value={note} onChange={(e) => { setNote(e.target.value); }} required />
                </div>
                </div>
            </div>
                <button type="submit" className="btn btn-primary">Add</button>
            </form>
        </div>
  )
}