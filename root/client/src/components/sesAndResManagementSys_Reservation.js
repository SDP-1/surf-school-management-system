import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Reservation = ({ reservation }) => {
  const {
    _id,
    refID,
    stdname,
    sessionID,
    date,
    time,
    numOfParticipents,
    contactNum,
    email,
    amount,
  } = reservation;

  const deleteHandler = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Reservation?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:4000/reservations/${_id}`);
        window.alert("Reservation deleted successfully!");
        window.location.reload();
      } catch (error) {
        console.error("Error deleting Reservation:", error);
      }
    }
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        {/* <h6 className="card-title">Reservation ID: {_id}</h6> */}
        <h5 className="card-text">Session ID: {sessionID}</h5>
        <p className="card-text">Reference ID: {refID}</p>
        <p className="card-text">Student Name: {stdname}</p>
        <p className="card-text">Date: {date}</p>
        <p className="card-text">Time: {time}</p>
        <p className="card-text">Number of Participants: {numOfParticipents}</p>
        <p className="card-text">Contact Number: {contactNum}</p>
        <p className="card-text">E-mail: {email}</p>
        <p className="card-text">Total Amount: {amount}</p>
        <Link
          to={`/sesAndResManagement/reservationdetails/${_id}`}
          className="btn btn-warning text-dark mr-2" // Applying Bootstrap classes for light yellow color
        >
          Update
        </Link>

        <button onClick={deleteHandler} className="btn btn-danger">
          Delete
        </button>
      </div>
    </div>
  );
};

export default Reservation;
