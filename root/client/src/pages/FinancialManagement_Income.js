import React, { useState, useEffect } from "react";
import axios from "axios";
import EditPayment from "../components/FinancialManagement_EditPayment";
import { Link } from "react-router-dom";

function Income() {
  const [payments, setPayments] = useState([]);
  const [editPayment, setEditPayment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [refreshTable, setRefreshTable] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const loginUser = "Sehan Devidna";

  useEffect(() => {
    handleFilterChange({ target: { value: filterStatus } });
  }, [refreshTable]);

  useEffect(() => {
    handleSearch();

    const inputElement = document.getElementById("search-bar");
    const handleChange = (event) => {
      let value = event.target.value;

      if (value == "") {
        // handleSearch();
        let e = { target: { value: filterStatus } };
        handleFilterChange(e);
      }
    };

    inputElement.addEventListener("input", handleChange);
  }, []); // Update search results when search query or payments change

  const handleSearch = () => {
    console.log("hadel search Call");

    if (!searchQuery) {
      // If search query is empty, reset to original payments
      fetchPayments();
      return;
    }

    const filteredPayments = payments.filter((payment) =>
      Object.values(payment).some((field) => {
        if (field != null) {
          // Check if field is not null or undefined
          const fieldValueAsString = field.toString();
          return fieldValueAsString
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        }
        return false; // Skip this field if it's null or undefined
      })
    );

    setPayments(filteredPayments);
  };

  const fetchPayments = () => {
    axios
      .get("http://localhost:4000/payment/")
      .then((res) => {
        setPayments(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleConfirm = (paymentId) => {
    if (window.confirm("Are you sure you want to confirm this payment?")) {
      // If user confirms, update payment status and acceptBy

      axios
        .get(`http://localhost:4000/payment/${paymentId}`)
        .then((res) => {
          console.log("payment feach successfully");

          let data = {
            refId: res.data.refId,
            date: res.data.date,
            time: res.data.time,
            cashType: res.data.cashType,
            Advance: res.data.Advance,
            details: res.data.details,
            comment: res.data.comment,
            status: res.data.amountDue > 0 ? true : false,
            acceptBy: loginUser,
            incomeOrOutgoing: "income", //income or outgoing
            totalAmount: res.data.totalAmount,
            amountPaid: res.data.amountPaid,
            amountDue: res.data.amountDue,
            slip: res.data.slip,
          };

          console.log(data);

          axios
            .post("http://localhost:4000/transaction/save", data)
            .then((response) => {
              console.log("Transaction saved successfully:", response.data);

              axios
                .put(`http://localhost:4000/payment/confirm/${paymentId}`, {
                  acceptBy: `${loginUser}`, // Replace 'username' with actual username
                })
                .then((res) => {
                  console.log("Payment confirmed.");
                  // Fetch updated payments after confirmation
                  fetchPayments();
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((error) => {
              console.error("Error saving Transaction:", error);
              // Handle error (e.g., show an error message to the user)
            });
        })
        .catch((err) => {
          console.error("Error feching payment:", err);
        });
    } else {
      console.log("Payment confirmation cancelled.");
    }
  };

  // const [slipUrl, setSlipUrl] = useState("");
  const handleGetSlip = (paymentId) => {
    // console.log(paymentId);
    axios
      .get(`http://localhost:4000/payment/slip/${paymentId}`) // Send request with payment ID
      .then((res) => {
        // Assuming the response contains the URL of the slip image
        // setSlipUrl(res.data.slipUrl);
        // setSlipUrl( { url: res.data.slipUrl , id : paymentId});
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

  // Function to toggle the refresh state
  const toggleRefreshTable = () => {
    setRefreshTable((prevState) => !prevState);
  };

  const openModal = (payment) => {
    setEditPayment(payment);
    setShowModal(true);
  };

  const closeModal = () => {
    setEditPayment(null);
    setShowModal(false);
  };

  const handleFilterChange = (e) => {
    const selectedStatus = e.target.value;

    if (selectedStatus === "all") {
      axios
        .get("http://localhost:4000/payment/")
        .then((res) => {
          setPayments(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log(selectedStatus);
      axios
        .get(`http://localhost:4000/payment/status/${selectedStatus}`)
        .then((res) => {
          setPayments(res.data); // Filter payments based on selected status
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
                  Manage <b>Income</b>
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
                      name="pending"
                      value="pending"
                      checked={filterStatus === "pending"}
                      onChange={handleFilterChange}
                    />{" "}
                    Pending
                  </label>
                  <label
                    className={`btn btn-warning ${
                      filterStatus === "confirm" && "pending"
                    }`}
                  >
                    <input
                      type="radio"
                      name="confirm"
                      value="confirm"
                      checked={filterStatus === "confirm"}
                      onChange={handleFilterChange}
                    />{" "}
                    Confirm
                  </label>
                  <div
                    className="d-flex"
                    role="search"
                    style={{ marginLeft: "80px" }}
                  >
                    <input
                      className="form-control me-2"
                      id="search-bar"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                      onChange={(e) => setSearchQuery(e.target.value)}
                      value={searchQuery}
                      name="search"
                    />
                    <button
                      className="btn btn-outline-success"
                      onClick={handleSearch}
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">RefId</th>
                <th scope="col">Date/Time</th>
                <th scope="col">Details</th>
                <th scope="col">Comment</th>
                <th scope="col">Status</th>
                <th scope="col">AcceptBy</th>
                <th scope="col">Cashtype</th>
                <th scope="col">Is advance</th>
                <th scope="col">Total</th>
                <th scope="col">Paid</th>
                <th scope="col">Due</th>
                <th scope="col">Show sliip</th>
                <th scope="col">Confirm</th>
                <th scope="col">Edit</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr key={payment._id} data-status={payment.status}>
                  <td>{index + 1}</td>
                  <td>{payment.refId}</td>
                  <td>
                    {payment.date} / {payment.time}
                  </td>
                  <td>{payment.details}</td>
                  <td>{payment.comment}</td>
                  <td>{payment.status}</td>
                  <td>{payment.acceptBy}</td>
                  <td>{payment.cashType}</td>
                  <td>{payment.Advance ? "Yes" : "No"}</td>
                  <td>{payment.totalAmount}</td>
                  <td>{payment.amountPaid}</td>
                  <td>{payment.amountDue}</td>
                  {payment.cashType === "Bank Transfer" ? (
                    <td>
                      <button
                        type="button"
                        className="btn btn-dark"
                        onClick={() => handleGetSlip(payment._id)}
                      >
                        Slip
                      </button>
                    </td>
                  ) : (
                    <td></td>
                  )}
                  {payment.status === "pending" ? (
                    <td>
                      <button
                        type="button"
                        className="btn btn-dark"
                        onClick={() => handleConfirm(payment._id)}
                      >
                        Confirm
                      </button>
                    </td>
                  ) : (
                    <td></td>
                  )}
                  {payment.status === "pending" ? (
                    <td>
                      <button
                        type="button"
                        className="btn btn-dark"
                        onClick={() => openModal(payment)}
                      >
                        Edit
                      </button>
                    </td>
                  ) : (
                    <td></td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Modal for editing payments */}
          {editPayment && (
            <div
              className={`modal ${showModal ? "show" : ""}`}
              tabIndex="-1"
              role="dialog"
              style={{ display: showModal ? "block" : "none" }}
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Edit Payment</h5>
                    <button
                      type="button"
                      className="close"
                      onClick={closeModal}
                    >
                      <span>&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <EditPayment
                      payment={editPayment}
                      closeModal={closeModal}
                      onDelete={toggleRefreshTable}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <>
        <Link
          to={`/income/exportCSV/${filterStatus}`}
          style={{
            textDecoration: "none",
            color: "white",
            backgroundColor: "blue",
            padding: "10px",
            borderRadius: "5px",
            marginTop: "20px",
            display: "inline-block",
          }}
        >
          Export CSV
        </Link>
      </>
    </div>
  );
}

export default Income;
