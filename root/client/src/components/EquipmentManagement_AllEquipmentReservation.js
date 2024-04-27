import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";
import { MdAdd } from "react-icons/md";

export default function AllEquipmentReservation() {
  const [reservation, setreservation] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermDate, setSearchTermDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    function getEquipment() {
      axios
        .get("http://localhost:4000/equipmentReservation/allReservation")
        .then((res) => {
          setreservation(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getEquipment();
  }, []);

  const handleDelete = (reservationId) => {
    axios
      .delete(`http://localhost:4000/equipmentReservation/cancelReservation/${reservationId}`)
      .then((res) => {
        alert(res.data.message);
        navigate(0);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (reservation.every((reservation) => reservation.reservationId.toString().includes(e.target.value) && !reservation.equipmentId.toLowerCase().includes(e.target.value.toLowerCase()))) {
      setSearchTerm("");
    }
  };

  const filteredEquipment = reservation.filter((reservation) =>
    reservation.reservationId.toString().includes(searchTerm) ||
    reservation.equipmentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
<div className="container mt-5">
      <div className="mt-3">
        <Link className="btn btn-success" to="/Equipment_Management/addReservation">
          <MdAdd />Add Reservation
        </Link>
      </div>
      <div className="row mt-3 mb-3">
      <div className="col d-flex justify-content-end">
  <div className="input-group w-25">
    <input
      type="text"
      placeholder="Search..."
      className="form-control"
      value={searchTerm}
      onChange={handleSearch}
    />
    <button className="btn btn-outline-primary" type="button">
      <IoSearchSharp />
    </button>
  </div>
</div>
</div>
      <table className="table mt-5">
        <thead>
          <tr className="bg-dark">
            <th scope="col">Reservation Id</th>
            <th scope="col">Equipment Id</th>
            <th scope="col">Renter Id</th>
            <th scope="col">Reservation Date</th>
            <th scope="col">Return Date</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {filteredEquipment.map((equipReservation, index) => (
            <tr key={index}>
              <td>{equipReservation.reservationId}</td>
              <td>{equipReservation.equipmentId}</td>
              <td>{equipReservation.renterId}</td>
              <td>{new Date(equipReservation.reservationDate).toLocaleDateString()}</td>
              <td>{new Date(equipReservation.returnDate).toLocaleDateString()}</td>
              <td>{equipReservation.status}</td>

              <td>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Link to={`/Equipment_Management/editEquipmentReservation/${equipReservation.reservationId}`}>
                  <button className="btn btn-success me-3">
                    <AiFillEdit />
                  </button>
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(equipReservation.reservationId)}
                >
                  <MdDelete />
                </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}