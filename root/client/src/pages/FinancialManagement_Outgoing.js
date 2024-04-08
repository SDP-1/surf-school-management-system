import React, { useState, useEffect } from "react";
import axios from "axios";
import EditPayment from "../components/FinancialManagement_EditPayment";
import { Link } from "react-router-dom";

function Outgoing() {
  const [outgoing, setOutgoing] = useState([]);
  const [editOutgoing, setEditOutgoing] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [refreshTable, setRefreshTable] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const loginUser = "Sehan Devidna"; //add loging user for this

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
  }, []); // Update search results when search query or outgoing change

  const handleSearch = () => {
    // console.log("hadel search Call");

    if (!searchQuery) {
      // If search query is empty, reset to original outgoing
      fetchOutgoing();
      return;
    }

    const filteredOutgoing = outgoing.filter((outgoing) =>
      Object.values(outgoing).some((field) => {
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

    setOutgoing(filteredOutgoing);
  };

  const fetchOutgoing = () => {
    axios
      .get("http://localhost:4000/outgoing/")
      .then((res) => {
        setOutgoing(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleConfirm = (outgoingId) => {
    if (window.confirm("Are you sure you want to confirm this outgoing?")) {
      // If user confirms, update outgoing status and acceptBy

      axios
        .get(`http://localhost:4000/outgoing/${outgoingId}`)
        .then((res) => {
          console.log("Outgoing fetched successfully");

          let data = {
            refId: res.data.refId,
            date: res.data.date,
            time: res.data.time,
            details: res.data.details,
            comment: res.data.comment,
            status: false,
            acceptBy: loginUser,
            totalAmount: res.data.amount,
            amountPaid: res.data.amount,
            incomeOrOutgoing: "outgoing", //income or outgoing
          };

        //   console.log(data);

          axios
            .post("http://localhost:4000/transaction/save", data)
            .then((response) => {
              console.log("Transaction saved successfully:", response.data);

              axios
                .put(`http://localhost:4000/outgoing/confirm/${outgoingId}`, {
                  acceptBy: loginUser,
                })
                .then((res) => {
                  console.log("Outgoing confirmed.");
                  // Fetch updated outgoing after confirmation
                  fetchOutgoing();
                })
                .catch((err) => {
                  console.log("Error confirming outgoing:", err);
                });
            })
            .catch((error) => {
              console.error("Error saving Transaction:", error);
              // Handle error (e.g., show an error message to the user)
            });
        })
        .catch((err) => {
          console.error("Error fetching outgoing:", err);
        });
    } else {
      console.log("Outgoing confirmation cancelled.");
    }
  };

  // Function to toggle the refresh state
  const toggleRefreshTable = () => {
    setRefreshTable((prevState) => !prevState);
  };

  const openModal = (outgoing) => {
    setEditOutgoing(outgoing);
    setShowModal(true);
  };

  const closeModal = () => {
    setEditOutgoing(null);
    setShowModal(false);
  };

  const handleFilterChange = (e) => {
    const selectedStatus = e.target.value;

    if (selectedStatus === "all") {
      axios
        .get("http://localhost:4000/outgoing/")
        .then((res) => {
          setOutgoing(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log(selectedStatus);
      axios
        .get(`http://localhost:4000/outgoing/status/${selectedStatus}`)
        .then((res) => {
          setOutgoing(res.data); // Filter outgoing based on selected status
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
                  Manage <b>Outgoing</b>
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
                    style={{ marginLeft: "40px" }}
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
                <th scope="col">Total</th>
                <th scope="col">Confirm</th>
                <th scope="col">Edit</th>
              </tr>
            </thead>
            <tbody>
              {outgoing.map((outgoing, index) => (
                <tr key={outgoing._id} data-status={outgoing.status}>
                  <td>{index + 1}</td>
                  <td>{outgoing.refId}</td>
                  <td>
                    {outgoing.date} / {outgoing.time}
                  </td>
                  <td>{outgoing.details}</td>
                  <td>{outgoing.comment}</td>
                  <td>{outgoing.status}</td>
                  <td>{outgoing.acceptBy}</td>
                  <td>{outgoing.amount}</td>
                  {outgoing.status === "pending" ? (
                    <td>
                      <button
                        type="button"
                        className="btn btn-dark"
                        onClick={() => handleConfirm(outgoing._id)}
                      >
                        Confirm
                      </button>
                    </td>
                  ) : (
                    <td></td>
                  )}
                  {outgoing.status === "pending" ? (
                    <td>
                      <button
                        type="button"
                        className="btn btn-dark"
                        onClick={() => openModal(outgoing)}
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

          {/* Modal for editing outgoing */}
          {editOutgoing && (
            <div
              className={`modal ${showModal ? "show" : ""}`}
              tabIndex="-1"
              role="dialog"
              style={{ display: showModal ? "block" : "none" }}
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Edit Outgoing</h5>
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
                      outgoing={editOutgoing}
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
          to={`/FinancialManagement/outcome/exportCSV/${filterStatus}`}
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

export default Outgoing;
