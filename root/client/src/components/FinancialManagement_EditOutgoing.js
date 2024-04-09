// EditeOutgoing.js

import React, { useState, useEffect } from "react";
import axios from "axios";

const EditeOutgoing = ({ outgoing, closeModal, onDelete }) => {
  const [editOutgoing, setEditPayment] = useState({
    ...outgoing,
  });

  useEffect(() => {
    const AmountElement = document.getElementById("amount");

    AmountElement.addEventListener("click", () => {
      // Select the value of nowPayAmountElement
      AmountElement.select();
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditPayment({ ...editOutgoing, [name]: value });
  };

  const handleSubmit = () => {
    // Logic to submit edited outgoing
    axios
      .put(
        `http://localhost:4000/outgoing/update/${editOutgoing._id}`,
        editOutgoing
      )
      .then((res) => {
        console.log(editOutgoing);
        console.log("Transaction edited successfully");
        closeModal(); // Close the modal after editing
      })
      .catch((err) => {
        console.log(editOutgoing);
        console.log(err);
        console.error("Error editing outgoing:", err);
      });
  };

  const handleDelete = () => {
    // Logic to delete the outgoing
    axios
      .delete(`http://localhost:4000/outgoing/delete/${editOutgoing._id}`)
      .then((res) => {
        console.log("Transaction deleted successfully");
        onDelete(); // Call the onDelete function passed from the parent component
        closeModal(); // Close the modal after deleting
      })
      .catch((err) => {
        console.error("Error deleting outgoing:", err);
      });
  };

  return (
    <div className="container">
      <style>
        {`
        .form-group.row {
          margin-bottom: 10px;
        }

        #comment, #amount {
          background-color: #83c6f2;
        }

      `}
      </style>

      <h2 className="my-4 text-center">Edit Payment</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group row">
          <label htmlFor="refid" className="col-sm-3 col-form-label">
            Ref ID
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="refid"
              name="refid"
              value={editOutgoing.refId}
              onChange={handleChange}
              readOnly
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="date" className="col-sm-3 col-form-label">
            Date / Time
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="date"
              name="date"
              value={`${editOutgoing.date}   /   ${editOutgoing.time}`}
              onChange={handleChange}
              readOnly
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="date" className="col-sm-3 col-form-label">
            Details
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="details"
              name="details"
              value={editOutgoing.details}
              onChange={handleChange}
              readOnly
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="details" className="col-sm-3 col-form-label">
            Comment
          </label>
          <div className="col-sm-9">
            <textarea
              className="form-control"
              id="comment"
              name="comment"
              value={editOutgoing.comment}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="cashType" className="col-sm-3 col-form-label">
            Status
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="status"
              name="status"
              value={editOutgoing.status}
              readOnly
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="cashType" className="col-sm-3 col-form-label">
            Accept By
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="acceptBy"
              name="acceptBy"
              value={editOutgoing.acceptBy}
              readOnly
            />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="status1" className="col-sm-3 col-form-label">
            Total
          </label>
          <div className="col-sm-9">
            <input
              type="number"
              className="form-control"
              id="amount"
              name="amount"
              value={editOutgoing.amount}
              onChange={handleChange}
              // readOnly
            />
          </div>
        </div>

        {/* Add more fields as needed */}
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">
            Save
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditeOutgoing;
