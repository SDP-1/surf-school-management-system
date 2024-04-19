import React, { useState, useEffect } from "react";
import axios from "axios";
import { CSVLink } from "react-csv";

function IncomeReportCSV({ data }) {
  const [payments, setPayments] = useState([]);
  const [filterStatus, setFilterStatus] = useState(data);

  useEffect(() => {
    let e = { target: { value: filterStatus } };
    handleFilterChange(e);
  }, []);

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
    // console.log(payments);
  };

  return (
    <div className="wrapper">
      {payments.length > 0 && (
        <>
          <h3>Export {data} payments</h3>
          <table className="table">
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
                </tr>
              ))}
            </tbody>
          </table>

          {/* CSv button to export */}
          <div className="csv-button">
            <CSVLink data={payments} filename={`Export ${data} payments`}>
              Export
            </CSVLink>
          </div>
        </>
      )}
    </div>
  );
}

export default IncomeReportCSV;
