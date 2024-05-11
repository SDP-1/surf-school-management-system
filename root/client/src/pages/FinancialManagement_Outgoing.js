import React, { useState, useEffect } from "react";
import axios from "axios";
import EditeOutgoing from "../components/FinancialManagement_EditOutgoing";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import { GrDocumentPdf } from "react-icons/gr";
import "jspdf-autotable";

function Outgoing() {
  const [outgoings, setOutgoing] = useState([]);
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
  }, []); // Update search results when search query or outgoings change

  const handleSearch = () => {
    // console.log("hadel search Call");

    if (!searchQuery) {
      // If search query is empty, reset to original outgoings
      fetchOutgoing();
      return;
    }

    const filteredOutgoing = outgoings.filter((outgoing) =>
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
                  // Fetch updated outgoings after confirmation
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
    // console.log(outgoing);
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
          setOutgoing(res.data); // Filter outgoings based on selected status
        })
        .catch((err) => {
          console.log(err);
        });
    }

    setFilterStatus(selectedStatus);
  };

  const generateOutgoingReport = () => {
    const doc = new jsPDF("p", "mm", "a4");
  
    const companyName = "Paradise Surf School";
    const companyAddress = "Midigama";
  
    doc.setFont("bold");
    doc.setFontSize(20);
    doc.text("Surf School Management", doc.internal.pageSize.width / 2, 20, {
      align: "center",
    });
  
    doc.setFont("bold");
    doc.setFontSize(15);
    doc.text(
      `Outgoing Report (${filterStatus})`,
      doc.internal.pageSize.width / 2,
      30,
      {
        align: "center",
      }
    );
  
    const logo = new Image();
    logo.src =
      "https://static.vecteezy.com/system/resources/previews/000/660/538/original/vector-surfing-paradise-logo.jpg";
    doc.addImage(logo, "JPEG", doc.internal.pageSize.width - 40, 5, 50, 50);
  
    doc.text(companyName, 10, 50);
    doc.text(companyAddress, 10, 55);
  
    const tableWidth = 200;
    const tableHeight = 20 * outgoings.length;
    const leftMargin = (doc.internal.pageSize.width - tableWidth) / 2;
  
    doc.autoTable({
      head: [
        [
          "#",
          "RefId",
          "Date/Time",
          "Details",
          "Comment",
          "Status",
          "AcceptBy",
          "Total",
        ],
      ],
      body: outgoings.map((outgoing, index) => [
        index + 1,
        outgoing.refId,
        `${outgoing.date} / ${outgoing.time}`,
        outgoing.details,
        outgoing.comment,
        outgoing.status,
        outgoing.acceptBy,
        outgoing.amount,
      ]),
      margin: { left: leftMargin, top: 70 },
      didDrawPage: (data) => {
        const currentPage = data.pageCount;
        const pageText = "Page " + currentPage;
        doc.text(
          pageText,
          doc.internal.pageSize.width / 2,
          doc.internal.pageSize.height - 10,
          { align: "center" }
        );
      },
    });
  
    doc.text(
      "Prepared by: Sehan Devinda",
      10,
      doc.internal.pageSize.height - 25
    );
    doc.text(
      "Date: " + new Date().toLocaleDateString(),
      10,
      doc.internal.pageSize.height - 20
    );
  
    doc.save("outgoing_report.pdf");
  };
  

  return (
    <div className="container-fluid">
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
              {outgoings.map((outgoing, index) => (
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

          {/* Modal for editing outgoings */}
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
                    <EditeOutgoing
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

      <div  style={{
          display: "flex",
          flexDirection: "row",
          justifyItems: "center",
        }}>
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
        <div className="mt-3">
          <button
            className="btn btn-primary"
            onClick={generateOutgoingReport}
            style={{
              backgroundColor: "blue",
              marginLeft: "20px",
              borderRadius: "5px",
              marginTop: "6px",
            }}
          >
            <GrDocumentPdf /> Generate Income Report    
          </button>
        </div>
      </div>
    </div>
  );
}

export default Outgoing;
