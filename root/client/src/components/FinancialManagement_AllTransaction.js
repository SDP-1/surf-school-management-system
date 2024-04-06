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

  // const [slipUrl, setSlipUrl] = useState("");
  const handleGetSlip = (transactionId) => {
    // console.log(transactionId);
    axios
      .get(`http://localhost:4000/transaction/slip/${transactionId}`) // Send request with payment ID
      .then((res) => {
        // Assuming the response contains the URL of the slip image
        // setSlipUrl(res.data.slipUrl);
        // setSlipUrl( { url: res.data.slipUrl , id : transactionId});
        // console.log(slipUrl);
        window.open(
          require(`../../../server/src/data/slips/${res.data.slipUrl}`),
          "_blank"
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
                      filterStatus === "all" && "income"
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
                      filterStatus === "income" && "income"
                    }`}
                  >
                    <input
                      type="radio"
                      name="status"
                      value="income"
                      checked={filterStatus === "income"}
                      onChange={handleFilterChange}
                    />{" "}
                    income
                  </label>
                  <label
                    className={`btn btn-warning ${
                      filterStatus === "coutgoing" && "income"
                    }`}
                  >
                    <input
                      type="radio"
                      name="status"
                      value="coutgoing"
                      checked={filterStatus === "coutgoing"}
                      onChange={handleFilterChange}
                    />{" "}
                    Outgoing
                  </label>
                </div>
              </div>
            </div>
          </div>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">RefId</th>
                <th scope="col">payment Date/Time</th>
                <th scope="col">confirmed Date/Time</th>
                <th scope="col">Details</th>
                <th scope="col">Comment</th>
                <th scope="col">Status</th>
                <th scope="col">income/outgoing</th>
                <th scope="col">AcceptBy</th>
                <th scope="col">Cashtype</th>
                <th scope="col">Is advance</th>
                <th scope="col">Total</th>
                <th scope="col">Paid</th>
                <th scope="col">Due</th>
                <th scope="col">Show sliip</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={transaction._id} data-status={transaction.status}>
                  <td>{index + 1}</td>
                  <td>{transaction.refId}</td>
                  <td>
                    {transaction.date} / {transaction.time}
                  </td>
                  <td>
                    {transaction.confirmDate} / {transaction.confirmTime}
                  </td>
                  <td>{transaction.details}</td>
                  <td>{transaction.comment}</td>
                  <td>
                    {transaction.status ? "incomplete" : "payment complete"}
                  </td>
                  <td>{transaction.incomeOrOutgoing}</td>
                  <td>{transaction.acceptBy}</td>
                  <td>{transaction.cashType}</td>
                  <td>{transaction.Advance ? "Yes" : "No"}</td>
                  <td>{transaction.totalAmount}</td>
                  <td>{transaction.amountPaid}</td>
                  <td>{transaction.amountDue}</td>
                  {transaction.cashType === "Bank Transfer" ? (
                    <td>
                      <button
                        type="button"
                        className="btn btn-dark"
                        onClick={() => handleGetSlip(transaction._id)}
                      >
                        Slip
                      </button>
                    </td>
                  ) : (
                    <td></td>
                  )}
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
