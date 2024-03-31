import React, { useState, useEffect } from "react";
import axios from "axios";
import EditTransaction from "./FinancialManagement_EditTransaction";

function AllTransaction() {
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    function getTransactions() {
      axios
        .get("http://localhost:4000/transaction/")
        .then((res) => {
          setTransactions(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getTransactions();
  }, []);

  const openModal = (transaction) => {
    setEditingTransaction(transaction);
    setShowModal(true);
  };

  const closeModal = () => {
    setEditingTransaction(null);
    setShowModal(false);
  };

  const handleEdit = () => {
    // Logic to handle editing the transaction
    // You can perform axios.put or any other operation here
    closeModal(); // Close the modal after editing
  };

  const handleFilterChange = (e) => {
    const selectedStatus = e.target.value;

    if (selectedStatus === "all") {
      axios
        .get("http://localhost:4000/transaction/")
        .then((res) => {
          setTransactions(res.data); // Show all transactions
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .get(`http://localhost:4000/transaction/status/${selectedStatus}`)
        .then((res) => {
          setTransactions(res.data); // Filter transactions based on selected status
        })
        .catch((err) => {
          console.log(err);
        });
    }

    setFilterStatus(selectedStatus);
  };

  return (
    <div className="container-xl">
      <div className="table-responsive">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row">
              <div className="col-sm-6">
                <h2>
                  Manage <b>Transaction</b>
                </h2>
              </div>
              <div className="col-sm-6">
                <div className="btn-group" data-toggle="buttons">
                  <label
                    className={`btn btn-info ${
                      filterStatus === "all" && "pending"
                    }`}
                  >
                    <input
                      type="radio"
                      name="status"
                      value="all"
                      checked={filterStatus === "all"}
                      onChange={handleFilterChange}
                    />{" "}
                    All
                  </label>
                  <label
                    className={`btn btn-success ${
                      filterStatus === "pending" && "pending"
                    }`}
                  >
                    <input
                      type="radio"
                      name="status"
                      value="pending"
                      checked={filterStatus === "pending"}
                      onChange={handleFilterChange}
                    />{" "}
                    Pending
                  </label>
                  <label
                    className={`btn btn-warning ${
                      filterStatus === "conform" && "pending"
                    }`}
                  >
                    <input
                      type="radio"
                      name="status"
                      value="conform"
                      checked={filterStatus === "conform"}
                      onChange={handleFilterChange}
                    />{" "}
                    Confirm
                  </label>
                </div>
              </div>
            </div>
          </div>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">refid</th>
                <th scope="col">date</th>
                <th scope="col">details</th>
                <th scope="col">status1</th>
                <th scope="col">status2</th>
                <th scope="col">acceptBy</th>
                <th scope="col">Edit</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={transaction._id} data-status={transaction.status}>
                  <td>{index + 1}</td>
                  <td>{transaction.refid}</td>
                  <td>{transaction.date}</td>
                  <td>{transaction.details}</td>
                  <td>{transaction.status1}</td>
                  <td>{transaction.status2}</td>
                  <td>{transaction.acceptBy}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-dark"
                      onClick={() => openModal(transaction)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Modal for editing transactions */}
          {editingTransaction && (
            <div
              className={`modal ${showModal ? "show" : ""}`}
              tabIndex="-1"
              role="dialog"
              style={{ display: showModal ? "block" : "none" }}
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Edit Transaction</h5>
                    <button
                      type="button"
                      className="close"
                      onClick={closeModal}
                    >
                      <span>&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <EditTransaction
                      transaction={editingTransaction}
                      closeModal={closeModal}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AllTransaction;
