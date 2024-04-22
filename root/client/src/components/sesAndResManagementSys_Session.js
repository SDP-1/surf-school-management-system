import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Session = ({ session }) => {
  const { _id, name, type, instructor, date, time } = session;

  const deleteHandler = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this session?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:4000/sessions/${_id}`);
        window.alert("Session deleted successfully!");
        window.location.reload();
      } catch (error) {
        console.error("Error deleting Session:", error);
      }
    }
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">Session ID: {_id}</h5>
        <p className="card-text">Name: {name}</p>
        <p className="card-text">Type: {type}</p>
        <p className="card-text">Instructor: {instructor}</p>
        <p className="card-text">Date: {date}</p>
        <p className="card-text">Time: {time}</p>
        {/* <Link to={`/sessiondetails/${_id}`} className="btn btn-primary mr-2">Update</Link> */}
        <Link
          to={`/sesAndResManagement/sessiondetails/${_id}`}
          className="btn btn-warning mr-2" // Applying Bootstrap classes for light yellow color
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

export default Session;
