// EditePayment.js

import React, { useState, useEffect } from "react";
import axios from "axios";

const EditePayment = ({ payment, closeModal, onDelete }) => {
  const [editPayment, setEditPayment] = useState({
    ...payment,
  });

  const [totalAmount, setTotalAmount] = useState(editPayment.totalAmount);
  const [amountPaid, setAmountPaid] = useState(editPayment.amountPaid);
  const [amountDue, setAmountDue] = useState(editPayment.amountDue);
  const [advance, setAdvance] = useState(editPayment.Advance);

  useEffect(() => {
    const TotalpaymentElement = document.getElementById("totalAmount");
    const amountPaidElement = document.getElementById("amountPaid");

    const newAmountDue = totalAmount - amountPaid;

    setAmountDue(newAmountDue);
    editPayment.amountDue = newAmountDue;

    if (newAmountDue == 0) {
      setAdvance(false);
      editPayment.Advance = false;
    } else {
      setAdvance(true);
      editPayment.Advance = true;
    }

    TotalpaymentElement.addEventListener("click", () => {
      // Select the value of nowPayAmountElement
      TotalpaymentElement.select();
    });

    amountPaidElement.addEventListener("click", () => {
      // Select the value of nowPayAmountElement
      amountPaidElement.select();
    });
  }, [totalAmount, amountPaid]);

  const handleTotalAmountChange = (event) => {
    const newTotalAmount = parseFloat(event.target.value);
    setTotalAmount(newTotalAmount);
    if (amountDue == Number(0)) {
      setAdvance(false);
    } else {
      setAdvance(true);
    }
  };

  const handleAmountPaidChange = (event) => {
    const newAmountPaid = parseFloat(event.target.value);
    setAmountPaid(newAmountPaid);
    if (amountDue == Number(0)) {
      setAdvance(false);
    } else {
      setAdvance(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditPayment({ ...editPayment, [name]: value });
  };

  const handleSubmit = () => {
    // Logic to submit edited payment
    axios
      .put(
        `http://localhost:4000/payment/update/${editPayment._id}`,
        editPayment
      )
      .then((res) => {
        console.log(editPayment);
        console.log("Transaction edited successfully");
        closeModal(); // Close the modal after editing
      })
      .catch((err) => {
        console.log(editPayment);
        console.log(err);
        console.error("Error editing payment:", err);
      });
  };

  const handleDelete = () => {
    // Logic to delete the payment
    axios
      .delete(`http://localhost:4000/payment/delete/${editPayment._id}`)
      .then((res) => {
        console.log("Transaction deleted successfully");
        closeModal(); // Close the modal after deleting
      })
      .catch((err) => {
        console.error("Error deleting payment:", err);
      });
  };

  return (
    <div className="container">
      <style>
        {`
        .form-group.row {
          margin-bottom: 10px;
        }

        #comment, #amountPaid, #totalAmount {
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
              value={editPayment.refId}
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
              value={`${editPayment.date}   /   ${editPayment.time}`}
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
              value={editPayment.details}
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
              value={editPayment.comment}
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
              value={editPayment.status}
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
              value={editPayment.acceptBy}
              readOnly
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="cashType" className="col-sm-3 col-form-label">
            Cash Type
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="cashType"
              name="cashType"
              value={editPayment.cashType}
              readOnly
            />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="cashType" className="col-sm-3 col-form-label">
            Is advance
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="Advance"
              name="Advance"
              value={advance ? "Yes" : "No"}
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
              id="totalAmount"
              name="totalAmount"
              value={totalAmount}
              onChange={(event) => {
                handleChange(event);
                // Call your second method here
                // For example:
                handleTotalAmountChange(event);
              }}
              // readOnly
            />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="status2" className="col-sm-3 col-form-label">
            Paid
          </label>
          <div className="col-sm-9">
            <input
              type="number"
              className="form-control"
              id="amountPaid"
              name="amountPaid"
              value={amountPaid}
              onChange={(event) => {
                handleChange(event);
                // Call your second method here
                // For example:
                handleAmountPaidChange(event);
              }}
              // readOnly
            />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="acceptBy" className="col-sm-3 col-form-label">
            Payment Due
          </label>
          <div className="col-sm-9">
            <input
              type="number"
              className="form-control"
              id="amountDue"
              name="amountDue"
              value={amountDue}
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

export default EditePayment;
