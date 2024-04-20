import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AddEquipment = () => {
  const [reservationId, setReservationId] = useState("");
  const [equipmentId, setEquipmentId] = useState("");
  const [renterId, setRenterId] = useState("");
  const [reservationDate, setReservationDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [status, setStatus] = useState("");

  function sendData(e){
    e.preventDefault();
    const newEquipmentReservation={reservationId,equipmentId,renterId,reservationDate,returnDate,status}
    
    axios.post("http://localhost:4000/equipmentReservation/addReservation",newEquipmentReservation)
    .then(()=>{
        alert("equipment reservation Added")
       setReservationId("");
       setEquipmentId("");
       setRenterId("");
       setReservationDate(new Date());
       setReturnDate(new Date());
       setStatus("");
    }).catch((err)=>{
        alert(err)
    })
}

  return (
    <div className="container mt-5">
        <form className="mx-auto w-50 shadow p-5" onSubmit={sendData}>
            <Link className="btn btn-primary" to="/allReservation">Home</Link>
            <h3 className="mt-5">Fill-up details</h3>
            <div className="mb-3">
                <label htmlFor="itemcode" className="form-label">Reservation Id</label>
                <input type="text" className="form-control" id="reservationId" placeholder="Enter Reservation Id" name="reservationId" value={reservationId} onChange={(e) => {setReservationId(e.target.value);}} required />
            </div>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Equipment Id</label>
                <input type="text" className="form-control" id="equipmentId" placeholder="Enter Equipment Id" name="equipmentId" value={equipmentId} onChange={(e) => {setEquipmentId(e.target.value);}} required />
            </div>
<div className="mb-3">
                <label htmlFor="discription" className="form-label">Renter Id</label>
                <input type="text" className="form-control" id="renterId" placeholder="Enter Renter Is" name="renterId" value={renterId} onChange={(e) => {setRenterId(e.target.value);}} required />
            </div>
            <div className="mb-3">
                <label htmlFor="quantity_in_stock" className="form-label">Reservation Date</label>
                <input type="date" className="form-control" id="reservationdate" placeholder="Enter Reservation date" name="reservationDate" value={reservationDate} onChange={(e) => {setReservationDate(e.target.value);}}  required/>
            </div>
            <div className="mb-3">
                <label htmlFor="quantity_required" className="form-label">Return Date</label>
                <input type="date" className="form-control" id="returndate" placeholder="Enter Return Date" name="returndate" value={returnDate} onChange={(e) => {setReturnDate(e.target.value);}}  required/>
            </div>
            <div className="mb-3">
                <label htmlFor="purchase_to_be_made" className="form-label">status</label>
                <input type="text" className="form-control" id="status" placeholder="Enter status" name="status" value={status} onChange={(e) => {setStatus(e.target.value);}} required/></div>

            <button type="submit" className="btn btn-primary">Add</button>
        </form>
    </div>
  )
}

export default AddEquipment;