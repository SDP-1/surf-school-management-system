import React, { useState, useEffect } from "react";
import axios from "axios";
import EditPayment from "../components/FinancialManagement_EditPayment";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import { GrDocumentPdf } from "react-icons/gr";
import "jspdf-autotable";

function Income() {
  const [payments, setPayments] = useState([]);
  const [editPayment, setEditPayment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [refreshTable, setRefreshTable] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getSessionData = () => {
      const userData = sessionStorage.getItem("userData");
      return userData ? JSON.parse(userData) : null;
    };

    const data = getSessionData();
    setUserData(data);
  }, []);

  // const loginUser = "Sehan Devidna";
  const loginUser = userData && userData.fullName;


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
    // console.log("hadel search Call");

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

          // console.log(data);

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

  const generateReport = () => {
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
      `Income Report (${filterStatus})`,
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
    const tableHeight = 20 * payments.length;
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
          "CashType",
          "Is Advance",
          "Total",
          "Paid",
          "Due",
        ],
      ],
      body: payments.map((payment, index) => [
        index + 1,
        payment.refId,
        `${payment.date} / ${payment.time}`,
        payment.details,
        payment.comment,
        payment.status,
        payment.acceptBy,
        payment.cashType,
        payment.Advance ? "Yes" : "No",
        payment.totalAmount,
        payment.amountPaid,
        payment.amountDue,
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

    doc.save("income_report.pdf");
  };

  return (
    <div className="container-fluid">
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

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyItems: "center",
        }}
      >
        <Link
          to={`/FinancialManagement/income/exportCSV/${filterStatus}`}
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
            onClick={generateReport}
            style={{
              backgroundColor: "blue",
              marginLeft: "20px",
              borderRadius: "5px",
              marginTop: "6px",
            }}
          >
            <GrDocumentPdf /> Generate Outgoing Report    
          </button>
        </div>
      </div>
    </div>
  );
}

export default Income;
