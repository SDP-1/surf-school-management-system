import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

export default function UpdateSupplier(){
    const { suppliercode } = useParams();

    const [supplierupdate, setSupplierUpdate] = useState({
      suppliername:"",
      supplieremail:"",
      suppliertype:"",
      date:"",
      supplierphone :"",
      equipment:"",
      price:"",
      quantity:"",
      note:"",
      });
       
      // State variables for validation errors
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

      useEffect(() => {
        axios.get(`http://localhost:4000/supplier/view/${suppliercode}`)
          .then((response) => {
            const { supplierupdate } = response.data;
            // Parse date string to Date object
            const date = new Date(supplierupdate.date);
            // Update supplierupdate with the parsed date
            setSupplierUpdate({
              ...response.data.supplierupdate,
              
                // Convert the date string to a Date object
                date,
                
              
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }, [suppliercode]);
      function validateEmail(email) {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
      }
    
      function validatePhone(phone) {
        const re = /^\d{10}$/;
        return re.test(phone);
      }

      function sendData(e) {
        e.preventDefault();
        // Reset error messages
    setEmailError("");
    setPhoneError("");

    // Perform validations
    if (!validateEmail(supplierupdate.supplieremail)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    if (!validatePhone(supplierupdate.supplierphone)) {
      setPhoneError("Please enter a valid 10-digit phone number");
      return;
    }

        const updatedSupplier = {
            suppliercode,
            suppliername: supplierupdate.suppliername,
            supplieremail: supplierupdate.supplieremail, 
            suppliertype: supplierupdate.suppliertype, 
            date: supplierupdate.date.toISOString().slice(0, 19), //cutting milliseconds off
            supplierphone: supplierupdate.supplierphone,
            equipment: supplierupdate.equipment,
            price: supplierupdate.price,
            quantity: supplierupdate.quantity,
            note: supplierupdate.note,
            
         };
         axios.put(`http://localhost:4000/supplier/updatesupplier/${suppliercode}`, updatedSupplier)
      .then(() => {
        alert("Supplier  updated successfully");
        window.location.href = "/supplier/allsup";
      })
      .catch((err) => {
        alert(err);
      });
    }
      return (
        <div className="container mt-5">
          <form className="mx-auto w-50 shadow p-5" onSubmit={sendData}>
            <Link className="btn btn-primary" to="/supplier/allsup">Home</Link>
            <h3 className="mt-5">Edit details</h3>
            <div className="mb-3">
              <label htmlFor="suppliercode" className="form-label">Supplier Code</label>
              <input type="text" className="form-control" id="suppliercode" placeholder="Enter Spplier Code" name="suppliercode" value={suppliercode} />
            </div>
            <div className="mb-3">
              <label htmlFor="suppliername" className="form-label">Supplier Name</label>
              <input type="text" className="form-control" id="name" placeholder="Enter Supplier Name" name="suppliername" value={supplierupdate.suppliername} onChange={(e) => setSupplierUpdate({ ...supplierupdate, suppliername: e.target.value })} required />
            </div>
            <div className="mb-3">
                    <label htmlFor="supplieremail" className="form-label">Supplier Email</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter Supplier Email" name="supplieremail" value={supplierupdate.supplieremail} onChange={(e) => setSupplierUpdate({ ...supplierupdate, supplieremail: e.target.value })} required />
            </div>
            <div className="mb-3">
                    <label htmlFor="suppliertype" className="form-label">Supplier Type</label>
                    <input type="text" className="form-control" id="type" placeholder="Enter Supplier Type" name="suppliertype" value={supplierupdate.suppliertype} onChange={(e) => setSupplierUpdate({ ...supplierupdate, suppliertype: e.target.value })} required />
            </div>
            <div className="mb-3">
                    <label htmlFor="date" className="form-label">Date</label>
                    <input type="date" className="form-control" id="date" name="date" value={supplierupdate.date ? supplierupdate.date.toISOString().slice(0, 10):''} onChange={(e) => setSupplierUpdate({ ...supplierupdate, date: new Date(e.target.value) })} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="supplierphone" className="form-label">Supplier Phone</label>
                    <input type="tel" className="form-control" id="phone" placeholder="Enter Supplier Phone" name="supplierphone" value={supplierupdate.supplierphone} onChange={(e) => setSupplierUpdate({ ...supplierupdate, supplierphone: e.target.value })} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="equipment" className="form-label">Equipment</label>
                    <input type="text" className="form-control" id="equipment" placeholder="Enter Equipment" name="equipment" value={supplierupdate.equipment} onChange={(e) => setSupplierUpdate({ ...supplierupdate, equipment: e.target.value })} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input type="number" className="form-control" id="price" placeholder="Enter Price" name="price" value={supplierupdate.price} onChange={(e) => setSupplierUpdate({ ...supplierupdate, price: e.target.value })} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="quantity" className="form-label">Quantity</label>
                    <input type="number" className="form-control" id="quantity" placeholder="Enter Quantity" name="quantity" value={supplierupdate.quantity} onChange={(e) => setSupplierUpdate({ ...supplierupdate, quantity: e.target.value })} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="note" className="form-label">Note</label>
                    <input type="text" className="form-control" id="note" placeholder="Enter Note" name="note" value={supplierupdate.note} onChange={(e) => setSupplierUpdate({ ...supplierupdate, note: e.target.value })} required />
                </div>
            <button className="btn btn-primary">Update</button>
          </form>
        </div>
      );
}