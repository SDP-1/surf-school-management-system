import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

export default function EditEquipment() {
  const { reservationId } = useParams();

  const [reservation, setReservation] = useState({
    equipmentId: "",
    renterId: "",
    reservationDate: "",
    returnDate: "",
    status: "",
  });

  useEffect(() => {
    axios.get(`http://localhost:4000/equipmentReservation/view/${reservationId}`)
      .then((response) => {
        setReservation({
          ...response.data.reservation,
          reservationDate: new Date(response.data.reservation.reservationDate),
          returnDate: new Date(response.data.reservation.returnDate),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [reservationId]);

  function sendData(e) {
    e.preventDefault();

    const updatedReservation = {
      reservationId,
      equipmentId: reservation.equipmentId,
      renterId: reservation.renterId,
      reservationDate: reservation.reservationDate.toISOString().slice(0, 19),
      returnDate: reservation.returnDate.toISOString().slice(0, 19),
      status: reservation.status,
    };

    axios.put(`http://localhost:4000/equipmentReservation/editEquipmentReservation/${reservationId}`, updatedReservation)
      .then(() => {
        alert("Equipment Reservation  updated successfully");
        window.location.href = "/Equipment_Management/allReservation";
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div className="container mt-5">
      <form className="mx-auto w-50 shadow p-5" onSubmit={sendData}>
        <Link className="btn btn-primary" to="/Equipment_Management/allReservation">Home</Link>
        <h3 className="mt-5">Edit details</h3>
        <div className="mb-3">
          <label htmlFor="itemcode" className="form-label">Reservation Id</label>
          <input type="text" className="form-control" id="reservationId" placeholder="Enter Reservation Id" name="reservationId" value={reservationId} />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Equipment Id</label>
          <input type="text" className="form-control" id="equipmentId" placeholder="Enter Equipment Id" name="equipmentId" value={reservation.equipmentId} onChange={(e) => setReservation({ ...reservation, equipmentId: e.target.value })} required />
        </div>
        <div className="mb-3">
          <label htmlFor="discription" className="form-label">Renter Id</label>
          <input type="text" className="form-control" id="renterId" placeholder="Enter Renter Is" name="renterId" value={reservation.renterId} onChange={(e) => setReservation({ ...reservation, renterId: e.target.value })} required />
        </div>
        <div className="mb-3">
          <label htmlFor="quantity_in_stock" className="form-label">Reservation Date</label>
          <input type="date" className="form-control" id="reservationdate" placeholder="Enter Reservation date" name="reservationDate" value={reservation.reservationDate ? reservation.reservationDate.toISOString().slice(0, 10) : ''} onChange={(e) => setReservation({ ...reservation, reservationDate: new Date(e.target.value) })} required />
        </div>
        <div className="mb-3">
          <label htmlFor="quantity_required" className="form-label">Return Date</label>
          <input type="date" className="form-control" id="returndate" placeholder="Enter Return Date" name="returndate" value={reservation.returnDate ? reservation.returnDate.toISOString().slice(0, 10) : ''} onChange={(e) => setReservation({ ...reservation, returnDate: new Date(e.target.value) })} required />
        </div>
        <div className="mb-3">
          <label htmlFor="purchase_to_be_made" className="form-label">status</label>
          <input type="text" className="form-control" id="status" placeholder="Enter status" name="status" value={reservation.status} onChange={(e) => setReservation({ ...reservation, status: e.target.value })} required />
        </div>
        <button className="btn btn-primary">Update</button>
      </form>
    </div>
  );
}