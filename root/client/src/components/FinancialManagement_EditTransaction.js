// EditTransaction.js

import React, { useState } from "react";
import axios from "axios";

const EditTransaction = ({ transaction, closeModal, onDelete }) => {
  const [editedTransaction, setEditedTransaction] = useState({
    ...transaction,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTransaction({ ...editedTransaction, [name]: value });
  };

  const handleSubmit = () => {
    // Logic to submit edited transaction
    axios
      .put(
        `http://localhost:4000/transaction/update/${editedTransaction._id}`,
        editedTransaction
      )
      .then((res) => {
        console.log(editedTransaction);
        console.log("Transaction edited successfully");
        closeModal(); // Close the modal after editing
      })
      .catch((err) => {
        console.log(editedTransaction);
        console.log(err);
        console.error("Error editing transaction:", err);
      });
  };

  const handleDelete = () => {
    // Logic to delete the transaction
    axios
      .delete(
        `http://localhost:4000/transaction/delete/${editedTransaction._id}`
      )
      .then((res) => {
        console.log("Transaction deleted successfully");
        closeModal(); // Close the modal after deleting
      })
      .catch((err) => {
        console.error("Error deleting transaction:", err);
      });
  };

  return (
    <div className="container">
      <h2 className="my-4 text-center">Edit Transaction</h2>
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
              value={editedTransaction.refid}
              onChange={handleChange}
              readOnly
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="date" className="col-sm-3 col-form-label">
            Date
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="date"
              name="date"
              value={editedTransaction.date}
              onChange={handleChange}
              readOnly
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="details" className="col-sm-3 col-form-label">
            Details
          </label>
          <div className="col-sm-9">
            <textarea
              className="form-control"
              id="details"
              name="details"
              value={editedTransaction.details}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="status1" className="col-sm-3 col-form-label">
            Status 1
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="status1"
              name="status1"
              value={editedTransaction.status1}
              onChange={handleChange}
              readOnly
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="status2" className="col-sm-3 col-form-label">
            Status 2
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="status2"
              name="status2"
              value={editedTransaction.status2}
              onChange={handleChange}
              readOnly
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="acceptBy" className="col-sm-3 col-form-label">
            Accept By
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="acceptBy"
              name="acceptBy"
              value={editedTransaction.acceptBy}
              onChange={handleChange}
              readOnly
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

export default EditTransaction;
